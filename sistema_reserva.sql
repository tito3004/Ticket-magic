--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-08-13 00:34:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5094 (class 1262 OID 24576)
-- Name: sistema_reserva; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sistema_reserva WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';


ALTER DATABASE sistema_reserva OWNER TO postgres;

\connect sistema_reserva

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 41196)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 262 (class 1255 OID 32768)
-- Name: agregar_artista(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.agregar_artista(nombre_artista_inp text, tipo_artista_inp text, genero_inp text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
 

  -- Insertar en la tabla artista
  INSERT INTO public.artista(
	nombre_artista,tipo_artista,genero) 
  VALUES (
    nombre_artista_inp,
	tipo_artista_inp,
	genero_inp
  );
END;
$$;


ALTER FUNCTION public.agregar_artista(nombre_artista_inp text, tipo_artista_inp text, genero_inp text) OWNER TO postgres;

--
-- TOC entry 270 (class 1255 OID 32946)
-- Name: agregar_lugares(text, bigint, text, text, jsonb); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.agregar_lugares(nombre_lugar_inp text, capacidad_inp bigint, nombre_ciudad_inp text, nombre_pais_inp text, json_asientos jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  id_pais_var BIGINT;
  id_ciudad_var BIGINT;
  id_lugar BIGINT;
  id_asiento BIGINT;
  asiento_obj JSONB; 
  numero_asiento bigint;
  descripcion_asiento TEXT;
  precio numeric;
BEGIN
  -- Buscar país usando alias para evitar ambigüedad
  SELECT pais.id_pais INTO id_pais_var
  FROM pais
  WHERE pais.nombre_pais = nombre_pais_inp;

  -- Si no existe, insertar país
  IF id_pais_var IS NULL THEN
    INSERT INTO pais(nombre_pais)
    VALUES (nombre_pais_inp)
    RETURNING pais.id_pais INTO id_pais_var;
  END IF;

  -- Buscar ciudad usando alias también
  SELECT ciudad.id_ciudad INTO id_ciudad_var
  FROM ciudad
  WHERE ciudad.nombre_ciudad = nombre_ciudad_inp
    AND ciudad.id_pais = id_pais_var;

  -- Si no existe, insertar ciudad
  IF id_ciudad_var IS NULL THEN
    INSERT INTO ciudad(nombre_ciudad, id_pais)
    VALUES (nombre_ciudad_inp, id_pais_var)
    RETURNING ciudad.id_ciudad INTO id_ciudad_var;
  END IF;

  -- Insertar lugar
  INSERT INTO lugar(nombre_lugar, capacidad, id_ciudad)
  VALUES (nombre_lugar_inp, capacidad_inp, id_ciudad_var)
  RETURNING lugar.id_lugar INTO id_lugar;

  -- Procesar asientos desde el JSON
  FOR asiento_obj IN SELECT jsonb_array_elements(json_asientos)
  LOOP
    numero_asiento := asiento_obj ->> 'numero';
    descripcion_asiento := asiento_obj ->> 'descripcion';
	precio := asiento_obj ->> 'precio';

    INSERT INTO asiento(num_asiento, descripcion,precio)
    VALUES (numero_asiento, descripcion_asiento,precio)
    RETURNING asiento.id_asiento INTO id_asiento;

    INSERT INTO lugar_asiento(id_lugar, id_asiento)
    VALUES (id_lugar, id_asiento);
  END LOOP;
END;
$$;


ALTER FUNCTION public.agregar_lugares(nombre_lugar_inp text, capacidad_inp bigint, nombre_ciudad_inp text, nombre_pais_inp text, json_asientos jsonb) OWNER TO postgres;

--
-- TOC entry 266 (class 1255 OID 41139)
-- Name: cancelacion_eventos(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cancelacion_eventos(nombre_evento_inp text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  id_evento_var BIGINT;
BEGIN
  -- Obtener el ID del evento
  SELECT id_evento INTO id_evento_var
  FROM evento
  WHERE nombre_evento = nombre_evento_inp;

  -- Validar existencia
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No se encontró el evento con nombre: %', nombre_evento_inp;
  END IF;

  -- Registrar los boletos antes de eliminarlos
  INSERT INTO reporte_boleto_cancelados (
    id_boleto, fecha_de_compra, id_asiento, id_fecha,
    id_hora, id_evento, id_usuario, precio, cod_unico_boleto, fecha_cancelacion
  )
  SELECT
    id_boleto,
    fecha_de_compra,
    id_asiento,
    id_fecha,
    id_hora,
    id_evento,
    id_usuario,
    precio,
    cod_unico_boleto,
    now()
  FROM boleto
  WHERE id_evento = id_evento_var;

  -- 1. Eliminar boletos
  DELETE FROM boleto WHERE id_evento = id_evento_var;

  -- 2. Eliminar fechas_hora
  DELETE FROM fechas_hora
  WHERE id_fecha IN (
    SELECT id_fechas FROM evento_fechas WHERE id_evento = id_evento_var
  );

  -- 3. Eliminar evento_fechas ANTES de fechas
  DELETE FROM evento_fechas WHERE id_evento = id_evento_var;

  -- 4. Eliminar horas si ya no están referenciadas
  DELETE FROM hora
  WHERE id_hora IN (
    SELECT h.id_hora
    FROM hora h
    WHERE NOT EXISTS (
      SELECT 1 FROM fechas_hora fh WHERE fh.id_hora = h.id_hora
    )
  );

  -- 5. Eliminar fechas si ya no están referenciadas
  DELETE FROM fechas
  WHERE id_fecha IN (
    SELECT f.id_fecha
    FROM fechas f
    WHERE NOT EXISTS (
      SELECT 1 FROM fechas_hora fh WHERE fh.id_fecha = f.id_fecha
    )
  );

  -- 6. Eliminar lugar_evento si existe
  DELETE FROM lugar_evento WHERE id_evento = id_evento_var;

  -- 7. Finalmente, eliminar el evento
  DELETE FROM evento WHERE id_evento = id_evento_var;

END;
$$;


ALTER FUNCTION public.cancelacion_eventos(nombre_evento_inp text) OWNER TO postgres;

--
-- TOC entry 279 (class 1255 OID 41278)
-- Name: compra_boletos(integer, character varying, bigint, bigint, bigint, bigint, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.compra_boletos(cantidad_inp integer, localidad_inp character varying, fecha_inp bigint, hora_inp bigint, evento_inp bigint, usuario_inp bigint, cod_boleto_inp character varying) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
  asiento_rec RECORD;
  contador integer := 0;
  total_precio numeric := 0;
BEGIN
  FOR asiento_rec IN
    SELECT a.id_asiento, a.precio
    FROM asiento a
    WHERE a.descripcion = localidad_inp
      AND NOT EXISTS (
        SELECT 1
        FROM boleto b
        WHERE b.id_asiento = a.id_asiento
          AND b.id_fecha   = fecha_inp
          AND b.id_hora    = hora_inp
          AND b.id_evento  = evento_inp
      )
    ORDER BY a.id_asiento
    LIMIT cantidad_inp
    FOR UPDATE SKIP LOCKED
  LOOP
    INSERT INTO public.boleto(
      id_asiento,
      id_fecha,
      id_hora,
      id_evento,
      id_usuario,
      precio,
      cod_unico_boleto
    )
    VALUES (
      asiento_rec.id_asiento,
      fecha_inp,
      hora_inp,
      evento_inp,
      usuario_inp,
      asiento_rec.precio,
      cod_boleto_inp
    );

    contador := contador + 1;
    total_precio := total_precio + asiento_rec.precio;
  END LOOP;

  IF contador < cantidad_inp THEN
    RAISE EXCEPTION 'Solo se encontraron % asientos disponibles en la localidad "%"', contador, localidad_inp;
  END IF;

  RETURN total_precio;
END;
$$;


ALTER FUNCTION public.compra_boletos(cantidad_inp integer, localidad_inp character varying, fecha_inp bigint, hora_inp bigint, evento_inp bigint, usuario_inp bigint, cod_boleto_inp character varying) OWNER TO postgres;

--
-- TOC entry 278 (class 1255 OID 41242)
-- Name: consulta_boletos(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consulta_boletos(cod_inp character varying) RETURNS TABLE(id_boleto bigint, fecha_de_compra timestamp with time zone, num_asiento bigint, descripcion character varying, hora time without time zone, fecha date, nombre_evento character varying, correo character varying, total numeric, cod_unico_boleto text, id_pago character varying, cantidad integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id_boleto,
    b.fecha_de_compra,
    a.num_asiento,
    a.descripcion,
    h.hora,
    f.fecha,
    e.nombre_evento,
    u.correo,
    (
      SELECT SUM(b2.precio)::numeric
      FROM boleto b2
      WHERE b2.cod_unico_boleto = cod_inp
    ) AS total,
    b.cod_unico_boleto::text,
    p.id_pago,
    (
      SELECT COUNT(*)::integer
      FROM boleto b3
      WHERE b3.cod_unico_boleto = cod_inp
    ) AS cantidad
  FROM
    public.boleto b
  JOIN public.usuario u ON u.id = b.id_usuario
  JOIN public.fechas f ON b.id_fecha = f.id_fecha
  JOIN public.asiento a ON b.id_asiento = a.id_asiento
  JOIN public.hora h ON b.id_hora = h.id_hora
  JOIN public.evento e ON e.id_evento = b.id_evento
  LEFT JOIN public.pago p ON p.id_usuario = u.id
  WHERE
    b.cod_unico_boleto = cod_inp;
END;
$$;


ALTER FUNCTION public.consulta_boletos(cod_inp character varying) OWNER TO postgres;

--
-- TOC entry 275 (class 1255 OID 41276)
-- Name: consulta_boletos_admin(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consulta_boletos_admin(nombre_evento_inp text) RETURNS TABLE(id_boleto bigint, fecha_de_compra timestamp with time zone, num_asiento bigint, descripcion character varying, hora time without time zone, nombre_evento character varying, correo character varying, cod_unico_boleto text)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id_boleto,
    b.fecha_de_compra,
    a.num_asiento,
    a.descripcion,
    h.hora,
    e.nombre_evento,
    u.correo,
    b.cod_unico_boleto::text
  FROM public.boleto b
  full JOIN public.usuario u ON u.id = b.id_usuario
  full JOIN public.asiento a ON b.id_asiento = a.id_asiento
  full JOIN public.hora h ON b.id_hora = h.id_hora
  full JOIN public.evento e ON e.id_evento = b.id_evento
  where b.id_boleto is not null and e.nombre_evento = nombre_evento_inp;
END;
$$;


ALTER FUNCTION public.consulta_boletos_admin(nombre_evento_inp text) OWNER TO postgres;

--
-- TOC entry 277 (class 1255 OID 41280)
-- Name: consulta_boletos_por_usuario(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consulta_boletos_por_usuario(id_usuario_in bigint) RETURNS TABLE(cod_unico_boleto text, fecha_de_compra timestamp with time zone, nombre_evento character varying, fecha date, hora time without time zone, cantidad integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.cod_unico_boleto::text               AS cod_unico_boleto,
    MIN(b.fecha_de_compra)                 AS fecha_de_compra,
    e.nombre_evento,
    f.fecha,
    h.hora,
    COUNT(*)::integer                      AS cantidad
  FROM public.boleto b
  JOIN public.fechas f ON b.id_fecha = f.id_fecha
  JOIN public.hora   h ON b.id_hora  = h.id_hora
  JOIN public.evento e ON e.id_evento = b.id_evento
  WHERE b.id_usuario = id_usuario_in
  GROUP BY b.cod_unico_boleto, e.nombre_evento, f.fecha, h.hora
  ORDER BY MIN(b.fecha_de_compra) DESC;
END;
$$;


ALTER FUNCTION public.consulta_boletos_por_usuario(id_usuario_in bigint) OWNER TO postgres;

--
-- TOC entry 276 (class 1255 OID 41279)
-- Name: consulta_boletos_qr(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consulta_boletos_qr(cod_inp character varying) RETURNS TABLE(cod_unico_boleto text, nombre_evento character varying, fecha date, hora time without time zone, cantidad integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.cod_unico_boleto::text               AS cod_unico_boleto,
    e.nombre_evento,
    f.fecha,
    h.hora,
    COUNT(*)::integer                      AS cantidad
  FROM public.boleto   b
  JOIN public.usuario  u ON u.id = b.id_usuario
  JOIN public.fechas   f ON b.id_fecha = f.id_fecha
  JOIN public.hora     h ON b.id_hora  = h.id_hora
  JOIN public.evento   e ON e.id_evento = b.id_evento
  WHERE b.cod_unico_boleto = cod_inp
  GROUP BY b.cod_unico_boleto, e.nombre_evento, f.fecha, h.hora;
END;
$$;


ALTER FUNCTION public.consulta_boletos_qr(cod_inp character varying) OWNER TO postgres;

--
-- TOC entry 265 (class 1255 OID 41238)
-- Name: consulta_eventos(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consulta_eventos() RETURNS TABLE(id_evento bigint, nombre_evento character varying, tipo_evento character varying, id_artista bigint, nombre_artista character varying, tipo_artista character varying, id_asiento bigint, num_asiento bigint, precio numeric, descripcion character varying, id_fecha bigint, fecha date, id_hora bigint, hora time without time zone, id_lugar bigint, nombre_lugar character varying, imagen_nombre character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id_evento,
        e.nombre_evento,
        e.tipo_de_evento,
        ar.id_artista,
        ar.nombre_artista,
        ar.tipo_artista,
        a.id_asiento,
        a.num_asiento,
        a.precio,
        a.descripcion,
        fe.id_fecha,
        fe.fecha,
        h.id_hora,
        h.hora,
        l.id_lugar,
        l.nombre_lugar,
        e.imagen_nombre
    FROM public.evento e
    FULL JOIN public.artista ar ON e.id_artista = ar.id_artista
    FULL JOIN public.evento_fechas ef ON e.id_evento = ef.id_evento
    FULL JOIN public.fechas fe ON ef.id_fechas = fe.id_fecha
    FULL JOIN public.fechas_hora fh ON fe.id_fecha = fh.id_fecha
    FULL JOIN public.hora h ON fh.id_hora = h.id_hora
    FULL JOIN public.lugar_evento le ON e.id_evento = le.id_evento
    FULL JOIN public.lugar l ON le.id_lugar = l.id_lugar
    FULL JOIN public.lugar_asiento la ON l.id_lugar = la.id_lugar
    FULL JOIN public.asiento a ON la.id_asiento = a.id_asiento
	where e.id_evento is not null
;
END;
$$;


ALTER FUNCTION public.consulta_eventos() OWNER TO postgres;

--
-- TOC entry 268 (class 1255 OID 32827)
-- Name: consulta_historial_pagos(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consulta_historial_pagos() RETURNS void
    LANGUAGE plpgsql
    AS $$
begin
select
	p.id_pago,
	p.fecha_pago,
	p.id_usuario,
	u.correo,
	r.total
from
	pago p
join usuario u on
	p.id_usuario = u.id
join recibo r on
	r.id_pago = p.id_pago;
end;

$$;


ALTER FUNCTION public.consulta_historial_pagos() OWNER TO postgres;

--
-- TOC entry 272 (class 1255 OID 41157)
-- Name: eliminar_boletos_por_codigo(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.eliminar_boletos_por_codigo(cod_boleto_inp text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM boleto
  WHERE cod_unico_boleto = cod_boleto_inp;
END;
$$;


ALTER FUNCTION public.eliminar_boletos_por_codigo(cod_boleto_inp text) OWNER TO postgres;

--
-- TOC entry 267 (class 1255 OID 41237)
-- Name: generar_eventos(text, text, text, jsonb, jsonb, jsonb, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generar_eventos(nombre_evento_inp text, tipo_evento_inp text, nombre_artista_inp text, json_fechas jsonb, json_horas jsonb, json_lugar jsonb, nombre_imagen_inp text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  fecha_text_var TEXT;
  fecha_var DATE;

  hora_text_var TEXT;
  hora_var TIME;

  id_fecha_var BIGINT;
  id_evento_var BIGINT;
  id_hora_var BIGINT;
  id_lugar_var BIGINT;
  id_artista_var BIGINT;

  lugar_obj_var JSONB;
  nombre_lugar_var TEXT;
BEGIN
  -- Obtener ID del artista
  SELECT id_artista INTO id_artista_var
  FROM artista
  WHERE nombre_artista = nombre_artista_inp;

  -- Insertar evento incluyendo imagen
  INSERT INTO evento(nombre_evento, tipo_de_evento, id_artista, imagen_nombre)
  VALUES (nombre_evento_inp, tipo_evento_inp, id_artista_var, nombre_imagen_inp)
  RETURNING id_evento INTO id_evento_var;

  -- Procesar fechas
  FOR fecha_text_var IN
    SELECT jsonb_array_elements_text(json_fechas)
  LOOP
    fecha_var := fecha_text_var::DATE;

    INSERT INTO fechas(fecha)
    VALUES (fecha_var)
    RETURNING id_fecha INTO id_fecha_var;

    INSERT INTO evento_fechas(id_evento, id_fechas)
    VALUES (id_evento_var, id_fecha_var);

    -- Procesar horas por cada fecha
    FOR hora_text_var IN
      SELECT jsonb_array_elements_text(json_horas)
    LOOP
      hora_var := hora_text_var::TIME;

      INSERT INTO hora(hora)
      VALUES (hora_var)
      RETURNING id_hora INTO id_hora_var;

      INSERT INTO fechas_hora(id_fecha, id_hora)
      VALUES (id_fecha_var, id_hora_var);
    END LOOP;
  END LOOP;

  -- Procesar lugares
  FOR lugar_obj_var IN
    SELECT jsonb_array_elements(json_lugar)
  LOOP
    nombre_lugar_var := lugar_obj_var ->> 'nombre_lugar';

    SELECT id_lugar INTO id_lugar_var
    FROM lugar
    WHERE nombre_lugar = nombre_lugar_var;

    INSERT INTO lugar_evento(id_lugar, id_evento)
    VALUES (id_lugar_var, id_evento_var);
  END LOOP;
END;
$$;


ALTER FUNCTION public.generar_eventos(nombre_evento_inp text, tipo_evento_inp text, nombre_artista_inp text, json_fechas jsonb, json_horas jsonb, json_lugar jsonb, nombre_imagen_inp text) OWNER TO postgres;

--
-- TOC entry 248 (class 1255 OID 24944)
-- Name: generar_recibo(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generar_recibo(usuario_inp text, id_pago_inp text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  total_pago NUMERIC;
  boletos TEXT;
BEGIN
  -- Calcular el total pagado por el usuario
  SELECT SUM(precio)
  INTO total_pago
  FROM boleto
  WHERE id_usuario = usuario_inp::BIGINT;

  -- Concatenar los códigos únicos de los boletos del usuario
  SELECT STRING_AGG(cod_unico_boleto, ', ')
  INTO boletos
  FROM boleto
  WHERE id_usuario = usuario_inp::BIGINT;

  -- Insertar en la tabla recibo
  INSERT INTO public.recibo (
    fecha_pago,
    total,
    id_boleto,
    boletos_comprados,
    id_pago
  )
  VALUES (
    now(),
    total_pago,
    NULL,          -- Puedes dejarlo null o adaptarlo si quieres un id_boleto
    boletos,
    id_pago_inp        -- O genera tu id_pago según cómo lo manejes
  );
END;
$$;


ALTER FUNCTION public.generar_recibo(usuario_inp text, id_pago_inp text) OWNER TO postgres;

--
-- TOC entry 264 (class 1255 OID 25038)
-- Name: generar_reporte_boleto(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generar_reporte_boleto() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
insert
	into
		reporte_boleto(
    id_boleto,
    fecha_de_compra,
    id_asiento,
    id_fecha,
	id_hora,
    id_evento,
    id_usuario,
    precio,
    cod_unico_boleto
  )
	values (
    NEW.id_boleto,
	NEW.fecha_de_compra,
	NEW.id_asiento,
	NEW.id_fecha,
	NEW.id_hora,
	NEW.id_evento,
	NEW.id_usuario,
	NEW.precio,
	NEW.cod_unico_boleto
  );

return new;
end;

$$;


ALTER FUNCTION public.generar_reporte_boleto() OWNER TO postgres;

--
-- TOC entry 269 (class 1255 OID 32906)
-- Name: generar_reporte_boleto_cancelados(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generar_reporte_boleto_cancelados() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO reporte_boleto_cancelados (
    id_boleto,
    fecha_de_compra,
    id_asiento,
    num_asiento,
    id_fecha,
    fecha,
    id_hora,
    hora,
    id_evento,
    nombre_evento,
    id_usuario,
    correo,
    precio,
    cod_unico_boleto,
    fecha_cancelacion
  )
  SELECT
    b.id_boleto,
    b.fecha_de_compra,
    b.id_asiento,
    a.num_asiento,
    b.id_fecha,
    f.fecha,
    b.id_hora,
    h.hora,
    b.id_evento,
    e.nombre_evento,
    b.id_usuario,
    u.correo,
    b.precio,
    b.cod_unico_boleto,
    NOW()
  FROM boleto b
  JOIN asiento a ON a.id_asiento = b.id_asiento
  JOIN fechas f ON f.id_fecha = b.id_fecha
  JOIN hora h ON h.id_hora = b.id_hora
  JOIN evento e ON e.id_evento = b.id_evento
  JOIN usuario u ON u.id = b.id_usuario
  WHERE b.id_boleto = OLD.id_boleto;

  RETURN OLD;
END;
$$;


ALTER FUNCTION public.generar_reporte_boleto_cancelados() OWNER TO postgres;

--
-- TOC entry 247 (class 1255 OID 24922)
-- Name: login(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.login(correo_input text, clave_input text) RETURNS TABLE(id integer, fecha_de_registro timestamp without time zone, nombres text, apellidos text, correo text, cedula text, admin boolean)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.fecha_de_registro,
    p.nombres,
    p.apellidos,
    p.correo,
    p.cedula,
    p.admin
  FROM public.persona p
  WHERE p.correo = correo_input
    AND p.clave = clave_input;
END;
$$;


ALTER FUNCTION public.login(correo_input text, clave_input text) OWNER TO postgres;

--
-- TOC entry 271 (class 1255 OID 41156)
-- Name: obtener_boletos_por_codigo(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obtener_boletos_por_codigo(cod_boleto_inp text) RETURNS TABLE(id_boleto bigint, fecha_de_compra timestamp with time zone, num_asiento bigint, descripcion text, fecha date, hora time without time zone, nombre_evento character varying, correo character varying, precio numeric, cod_unico_boleto text)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id_boleto,
    b.fecha_de_compra,
    a.num_asiento,
    a.descripcion,
    f.fecha,
    h.hora,
    e.nombre_evento,
    u.correo,
    b.precio,
    b.cod_unico_boleto
  FROM boleto b
  JOIN asiento a ON a.id_asiento = b.id_asiento
  JOIN fechas f ON f.id_fecha = b.id_fecha
  JOIN hora h ON h.id_hora = b.id_hora
  JOIN evento e ON e.id_evento = b.id_evento
  JOIN usuario u ON u.id = b.id_usuario
  WHERE b.cod_unico_boleto = cod_boleto_inp;
END;
$$;


ALTER FUNCTION public.obtener_boletos_por_codigo(cod_boleto_inp text) OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 24966)
-- Name: registrar_pago(text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.registrar_pago(pago_id text, usuario_id bigint) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pago WHERE id_pago = pago_id) THEN
    INSERT INTO pago (
      id_pago,
      fecha_pago,
      id_usuario
    )
    VALUES (
      pago_id,
      now(),
      usuario_id
    );
  END IF;
END;
$$;


ALTER FUNCTION public.registrar_pago(pago_id text, usuario_id bigint) OWNER TO postgres;

--
-- TOC entry 250 (class 1255 OID 32913)
-- Name: registro_usuario(text, text, text, text, text, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.registro_usuario(nombres_inp text, apellidos_inp text, cedula_inp text, correo_inp text, password_inp text, admin_inp boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
begin

  insert
	into
	public.usuario(
    nombres,
	apellidos,
	correo,
	cedula,
	admin,
	password)
values(
	nombres_inp ,
  	apellidos_inp,
	correo_inp,
	cedula_inp,
	admin_inp,
	password_inp
	);
END;
$$;


ALTER FUNCTION public.registro_usuario(nombres_inp text, apellidos_inp text, cedula_inp text, correo_inp text, password_inp text, admin_inp boolean) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 24601)
-- Name: artista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artista (
    id_artista bigint NOT NULL,
    nombre_artista character varying DEFAULT '60'::character varying NOT NULL,
    tipo_artista character varying DEFAULT '30'::character varying,
    genero character varying DEFAULT '30'::character varying
);


ALTER TABLE public.artista OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24600)
-- Name: artista_id_artista_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.artista ALTER COLUMN id_artista ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.artista_id_artista_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 24613)
-- Name: asiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asiento (
    id_asiento bigint NOT NULL,
    num_asiento bigint NOT NULL,
    descripcion character varying DEFAULT '120'::character varying,
    precio numeric
);


ALTER TABLE public.asiento OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24612)
-- Name: asiento_id_asiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.asiento ALTER COLUMN id_asiento ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.asiento_id_asiento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 24762)
-- Name: boleto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boleto (
    id_boleto bigint NOT NULL,
    fecha_de_compra timestamp with time zone DEFAULT now() NOT NULL,
    id_asiento bigint NOT NULL,
    id_fecha bigint NOT NULL,
    id_hora bigint NOT NULL,
    id_evento bigint NOT NULL,
    id_usuario bigint NOT NULL,
    precio numeric NOT NULL,
    cod_unico_boleto character varying(400)
);


ALTER TABLE public.boleto OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 24761)
-- Name: boleto_id_boleto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.boleto ALTER COLUMN id_boleto ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.boleto_id_boleto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 235 (class 1259 OID 24796)
-- Name: ciudad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ciudad (
    id_ciudad bigint NOT NULL,
    nombre_ciudad character varying DEFAULT '40'::character varying,
    id_pais bigint
);


ALTER TABLE public.ciudad OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 24795)
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ciudad ALTER COLUMN id_ciudad ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ciudad_id_ciudad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 24643)
-- Name: evento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evento (
    id_evento bigint NOT NULL,
    nombre_evento character varying DEFAULT '20'::character varying NOT NULL,
    tipo_de_evento character varying NOT NULL,
    id_artista bigint NOT NULL,
    imagen_nombre character varying(100)
);


ALTER TABLE public.evento OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 24810)
-- Name: evento_fechas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evento_fechas (
    id_evento bigint NOT NULL,
    id_fechas bigint NOT NULL
);


ALTER TABLE public.evento_fechas OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24642)
-- Name: evento_id_evento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.evento ALTER COLUMN id_evento ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.evento_id_evento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 24665)
-- Name: fechas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fechas (
    id_fecha bigint NOT NULL,
    fecha date NOT NULL
);


ALTER TABLE public.fechas OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 24824)
-- Name: fechas_hora; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fechas_hora (
    id_fecha bigint NOT NULL,
    id_hora bigint NOT NULL
);


ALTER TABLE public.fechas_hora OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24664)
-- Name: fechas_id_fecha_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fechas ALTER COLUMN id_fecha ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fechas_id_fecha_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 24679)
-- Name: hora; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hora (
    id_hora bigint NOT NULL,
    hora time without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hora OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24678)
-- Name: hora_id_hora_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.hora ALTER COLUMN id_hora ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.hora_id_hora_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 24839)
-- Name: lugar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lugar (
    id_lugar bigint NOT NULL,
    nombre_lugar character varying DEFAULT '30'::character varying NOT NULL,
    capacidad bigint NOT NULL,
    id_ciudad bigint
);


ALTER TABLE public.lugar OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 32772)
-- Name: lugar_asiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lugar_asiento (
    id_lugar bigint NOT NULL,
    id_asiento bigint NOT NULL
);


ALTER TABLE public.lugar_asiento OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 24852)
-- Name: lugar_evento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lugar_evento (
    id_lugar bigint NOT NULL,
    id_evento bigint NOT NULL
);


ALTER TABLE public.lugar_evento OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 24838)
-- Name: lugar_id_lugar_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lugar ALTER COLUMN id_lugar ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.lugar_id_lugar_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 241 (class 1259 OID 24865)
-- Name: pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pago (
    id_pago character varying(50) NOT NULL,
    fecha_pago timestamp with time zone DEFAULT now() NOT NULL,
    id_usuario bigint
);


ALTER TABLE public.pago OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24709)
-- Name: pais; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pais (
    id_pais bigint NOT NULL,
    nombre_pais character varying DEFAULT '30'::character varying NOT NULL
);


ALTER TABLE public.pais OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 24708)
-- Name: pais_id_pais_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.pais ALTER COLUMN id_pais ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pais_id_pais_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 244 (class 1259 OID 41128)
-- Name: reporte_boleto_cancelados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reporte_boleto_cancelados (
    id_reporte integer NOT NULL,
    id_boleto bigint,
    fecha_de_compra timestamp with time zone,
    id_asiento bigint,
    num_asiento bigint,
    id_fecha bigint,
    fecha date,
    id_hora bigint,
    hora time without time zone,
    id_evento bigint,
    nombre_evento character varying,
    id_usuario bigint,
    correo character varying,
    precio numeric,
    cod_unico_boleto text,
    fecha_cancelacion timestamp with time zone DEFAULT now()
);


ALTER TABLE public.reporte_boleto_cancelados OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 41127)
-- Name: reporte_boleto_cancelados_id_reporte_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reporte_boleto_cancelados_id_reporte_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reporte_boleto_cancelados_id_reporte_seq OWNER TO postgres;

--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 243
-- Name: reporte_boleto_cancelados_id_reporte_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reporte_boleto_cancelados_id_reporte_seq OWNED BY public.reporte_boleto_cancelados.id_reporte;


--
-- TOC entry 231 (class 1259 OID 24728)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id bigint NOT NULL,
    nombres character varying DEFAULT '50'::character varying NOT NULL,
    apellidos character varying DEFAULT '50'::character varying NOT NULL,
    cedula text DEFAULT '10'::text NOT NULL,
    correo character varying DEFAULT '120'::character varying NOT NULL,
    password character varying(256) DEFAULT '30'::character varying NOT NULL,
    admin boolean NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    verificado boolean
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24727)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuario ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4859 (class 2604 OID 41131)
-- Name: reporte_boleto_cancelados id_reporte; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reporte_boleto_cancelados ALTER COLUMN id_reporte SET DEFAULT nextval('public.reporte_boleto_cancelados_id_reporte_seq'::regclass);


--
-- TOC entry 5063 (class 0 OID 24601)
-- Dependencies: 219
-- Data for Name: artista; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artista (id_artista, nombre_artista, tipo_artista, genero) FROM stdin;
1	El bambino	Cantante	Cantante
2	tito	cantante	pop
3	tito	cantante	pop
4	Ivan	Musica pesada	Rock
5	Feid	Exitos	Reggea
6	Feid	Exitos	Reggea
7	Farru	El mas grande	Reggeaton
8	asdsds	dsdssds	dsdsd
9	Romeo	Musico	Bachata
\.


--
-- TOC entry 5065 (class 0 OID 24613)
-- Dependencies: 221
-- Data for Name: asiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asiento (id_asiento, num_asiento, descripcion, precio) FROM stdin;
1	1	VIP	20
2	2	VIP	20
3	3	VIP	20
4	4	VIP	20
5	5	VIP	20
6	6	VIP	20
7	7	VIP	20
8	8	VIP	20
9	9	VIP	20
10	10	VIP	20
11	11	VIP	20
12	12	VIP	20
13	13	VIP	20
14	14	VIP	20
15	15	VIP	20
16	16	VIP	20
17	17	VIP	20
18	18	VIP	20
19	19	VIP	20
20	20	VIP	20
21	21	VIP	20
22	22	VIP	20
23	23	VIP	20
24	24	VIP	20
25	25	VIP	20
26	26	VIP	20
27	27	VIP	20
28	28	VIP	20
29	29	VIP	20
30	30	VIP	20
31	31	VIP	20
32	32	VIP	20
33	33	VIP	20
34	34	VIP	20
35	35	VIP	20
36	36	VIP	20
37	37	VIP	20
38	38	VIP	20
39	39	VIP	20
40	40	VIP	20
41	41	VIP	20
42	42	VIP	20
43	43	VIP	20
44	44	VIP	20
45	45	VIP	20
46	46	VIP	20
47	47	VIP	20
48	48	VIP	20
49	49	VIP	20
50	50	VIP	20
51	51	VIP	20
52	52	VIP	20
53	53	VIP	20
54	54	VIP	20
55	55	VIP	20
56	56	VIP	20
57	57	VIP	20
58	58	VIP	20
59	59	VIP	20
60	60	VIP	20
61	61	VIP	20
62	62	VIP	20
63	63	VIP	20
64	64	VIP	20
65	65	VIP	20
66	66	VIP	20
67	67	VIP	20
68	68	VIP	20
69	69	VIP	20
70	70	VIP	20
71	71	VIP	20
72	72	VIP	20
73	73	VIP	20
74	74	VIP	20
75	75	VIP	20
76	76	VIP	20
77	77	VIP	20
78	78	VIP	20
79	79	VIP	20
80	80	VIP	20
81	81	VIP	20
82	82	VIP	20
83	83	VIP	20
84	84	VIP	20
85	85	VIP	20
86	86	VIP	20
87	87	VIP	20
88	88	VIP	20
89	89	VIP	20
90	90	VIP	20
91	91	VIP	20
92	92	VIP	20
93	93	VIP	20
94	94	VIP	20
95	95	VIP	20
96	96	VIP	20
97	97	VIP	20
98	98	VIP	20
99	99	VIP	20
100	100	VIP	20
101	101	VIP	20
102	102	VIP	20
103	103	VIP	20
104	104	VIP	20
105	105	VIP	20
106	106	VIP	20
107	107	VIP	20
108	108	VIP	20
109	109	VIP	20
110	110	VIP	20
111	111	VIP	20
112	112	VIP	20
113	113	VIP	20
114	114	VIP	20
115	115	VIP	20
116	116	VIP	20
117	117	VIP	20
118	118	VIP	20
119	119	VIP	20
120	120	VIP	20
121	121	VIP	20
122	122	VIP	20
123	123	VIP	20
124	124	VIP	20
125	125	VIP	20
126	126	VIP	20
127	127	VIP	20
128	128	VIP	20
129	129	VIP	20
130	130	VIP	20
131	131	VIP	20
132	132	VIP	20
133	133	VIP	20
134	134	VIP	20
135	135	VIP	20
136	136	VIP	20
137	137	VIP	20
138	138	VIP	20
139	139	VIP	20
140	140	VIP	20
141	141	VIP	20
142	142	VIP	20
143	143	VIP	20
144	144	VIP	20
145	145	VIP	20
146	146	VIP	20
147	147	VIP	20
148	148	VIP	20
149	149	VIP	20
150	150	VIP	20
151	151	VIP	20
152	152	VIP	20
153	153	VIP	20
154	154	VIP	20
155	155	VIP	20
156	156	VIP	20
157	157	VIP	20
158	158	VIP	20
159	159	VIP	20
160	160	VIP	20
161	161	VIP	20
162	162	VIP	20
163	163	VIP	20
164	164	VIP	20
165	165	VIP	20
166	166	VIP	20
167	167	VIP	20
168	168	VIP	20
169	169	VIP	20
170	170	VIP	20
171	171	VIP	20
172	172	VIP	20
173	173	VIP	20
174	174	VIP	20
175	175	VIP	20
176	176	VIP	20
177	177	VIP	20
178	178	VIP	20
179	179	VIP	20
180	180	VIP	20
181	181	VIP	20
182	182	VIP	20
183	183	VIP	20
184	184	VIP	20
185	185	VIP	20
186	186	VIP	20
187	187	VIP	20
188	188	VIP	20
189	189	VIP	20
190	190	VIP	20
191	191	VIP	20
192	192	VIP	20
193	193	VIP	20
194	194	VIP	20
195	195	VIP	20
196	196	VIP	20
197	197	VIP	20
198	198	VIP	20
199	199	VIP	20
200	200	VIP	20
201	201	VIP	20
202	202	VIP	20
203	203	VIP	20
204	204	VIP	20
205	205	VIP	20
206	206	VIP	20
207	207	VIP	20
208	208	VIP	20
209	209	VIP	20
210	210	VIP	20
211	211	VIP	20
212	212	VIP	20
213	213	VIP	20
214	214	VIP	20
215	215	VIP	20
216	216	VIP	20
217	217	VIP	20
218	218	VIP	20
219	219	VIP	20
220	220	VIP	20
221	221	VIP	20
222	222	VIP	20
223	223	VIP	20
224	224	VIP	20
225	225	VIP	20
226	226	VIP	20
227	227	VIP	20
228	228	VIP	20
229	229	VIP	20
230	230	VIP	20
231	231	VIP	20
232	232	VIP	20
233	233	VIP	20
234	234	VIP	20
235	235	VIP	20
236	236	VIP	20
237	237	VIP	20
238	238	VIP	20
239	239	VIP	20
240	240	VIP	20
241	241	VIP	20
242	242	VIP	20
243	243	VIP	20
244	244	VIP	20
245	245	VIP	20
246	246	VIP	20
247	247	VIP	20
248	248	VIP	20
249	249	VIP	20
250	250	VIP	20
251	251	VIP	20
252	252	VIP	20
253	253	VIP	20
254	254	VIP	20
255	255	VIP	20
256	256	VIP	20
257	257	VIP	20
258	258	VIP	20
259	259	VIP	20
260	260	VIP	20
261	261	VIP	20
262	262	VIP	20
263	263	VIP	20
264	264	VIP	20
265	265	VIP	20
266	266	VIP	20
267	267	VIP	20
268	268	VIP	20
269	269	VIP	20
270	270	VIP	20
271	271	VIP	20
272	272	VIP	20
273	273	VIP	20
274	274	VIP	20
275	275	VIP	20
276	276	VIP	20
277	277	VIP	20
278	278	VIP	20
279	279	VIP	20
280	280	VIP	20
281	281	VIP	20
282	282	VIP	20
283	283	VIP	20
284	284	VIP	20
285	285	VIP	20
286	286	VIP	20
287	287	VIP	20
288	288	VIP	20
289	289	VIP	20
290	290	VIP	20
291	291	VIP	20
292	292	VIP	20
293	293	VIP	20
294	294	VIP	20
295	295	VIP	20
296	296	VIP	20
297	297	VIP	20
298	298	VIP	20
299	299	VIP	20
300	300	VIP	20
301	301	Generar	12
302	302	Generar	12
303	303	Generar	12
304	304	Generar	12
305	305	Generar	12
306	306	Generar	12
307	307	Generar	12
308	308	Generar	12
309	309	Generar	12
310	310	Generar	12
311	311	Generar	12
312	312	Generar	12
313	313	Generar	12
314	314	Generar	12
315	315	Generar	12
316	316	Generar	12
317	317	Generar	12
318	318	Generar	12
319	319	Generar	12
320	320	Generar	12
321	321	Generar	12
322	322	Generar	12
323	323	Generar	12
324	324	Generar	12
325	325	Generar	12
326	326	Generar	12
327	327	Generar	12
328	328	Generar	12
329	329	Generar	12
330	330	Generar	12
331	331	Generar	12
332	332	Generar	12
333	333	Generar	12
334	334	Generar	12
335	335	Generar	12
336	336	Generar	12
337	337	Generar	12
338	338	Generar	12
339	339	Generar	12
340	340	Generar	12
341	341	Generar	12
342	342	Generar	12
343	343	Generar	12
344	344	Generar	12
345	345	Generar	12
346	346	Generar	12
347	347	Generar	12
348	348	Generar	12
349	349	Generar	12
350	350	Generar	12
351	351	Generar	12
352	352	Generar	12
353	353	Generar	12
354	354	Generar	12
355	355	Generar	12
356	356	Generar	12
357	357	Generar	12
358	358	Generar	12
359	359	Generar	12
360	360	Generar	12
361	361	Generar	12
362	362	Generar	12
363	363	Generar	12
364	364	Generar	12
365	365	Generar	12
366	366	Generar	12
367	367	Generar	12
368	368	Generar	12
369	369	Generar	12
370	370	Generar	12
371	371	Generar	12
372	372	Generar	12
373	373	Generar	12
374	374	Generar	12
375	375	Generar	12
376	376	Generar	12
377	377	Generar	12
378	378	Generar	12
379	379	Generar	12
380	380	Generar	12
381	381	Generar	12
382	382	Generar	12
383	383	Generar	12
384	384	Generar	12
385	385	Generar	12
386	386	Generar	12
387	387	Generar	12
388	388	Generar	12
389	389	Generar	12
390	390	Generar	12
391	391	Generar	12
392	392	Generar	12
393	393	Generar	12
394	394	Generar	12
395	395	Generar	12
396	396	Generar	12
397	397	Generar	12
398	398	Generar	12
399	399	Generar	12
400	400	Generar	12
401	401	Generar	12
402	402	Generar	12
403	403	Generar	12
404	404	Generar	12
405	405	Generar	12
406	406	Generar	12
407	407	Generar	12
408	408	Generar	12
409	409	Generar	12
410	410	Generar	12
411	411	Generar	12
412	412	Generar	12
413	413	Generar	12
414	414	Generar	12
415	415	Generar	12
416	416	Generar	12
417	417	Generar	12
418	418	Generar	12
419	419	Generar	12
420	420	Generar	12
421	421	Generar	12
422	422	Generar	12
423	423	Generar	12
424	424	Generar	12
425	425	Generar	12
426	426	Generar	12
427	427	Generar	12
428	428	Generar	12
429	429	Generar	12
430	430	Generar	12
431	431	Generar	12
432	432	Generar	12
433	433	Generar	12
434	434	Generar	12
435	435	Generar	12
436	436	Generar	12
437	437	Generar	12
438	438	Generar	12
439	439	Generar	12
440	440	Generar	12
441	441	Generar	12
442	442	Generar	12
443	443	Generar	12
444	444	Generar	12
445	445	Generar	12
446	446	Generar	12
447	447	Generar	12
448	448	Generar	12
449	449	Generar	12
450	450	Generar	12
451	451	Generar	12
452	452	Generar	12
453	453	Generar	12
454	454	Generar	12
455	455	Generar	12
456	456	Generar	12
457	457	Generar	12
458	458	Generar	12
459	459	Generar	12
460	460	Generar	12
461	461	Generar	12
462	462	Generar	12
463	463	Generar	12
464	464	Generar	12
465	465	Generar	12
466	466	Generar	12
467	467	Generar	12
468	468	Generar	12
469	469	Generar	12
470	470	Generar	12
471	471	Generar	12
472	472	Generar	12
473	473	Generar	12
474	474	Generar	12
475	475	Generar	12
476	476	Generar	12
477	477	Generar	12
478	478	Generar	12
479	479	Generar	12
480	480	Generar	12
481	481	Generar	12
482	482	Generar	12
483	483	Generar	12
484	484	Generar	12
485	485	Generar	12
486	486	Generar	12
487	487	Generar	12
488	488	Generar	12
489	489	Generar	12
490	490	Generar	12
491	491	Generar	12
492	492	Generar	12
493	493	Generar	12
494	494	Generar	12
495	495	Generar	12
496	496	Generar	12
497	497	Generar	12
498	498	Generar	12
499	499	Generar	12
500	500	Generar	12
501	1	Vip	20
502	2	Vip	20
503	3	Vip	20
504	4	Vip	20
505	5	Vip	20
506	6	Vip	20
507	7	Vip	20
508	8	Vip	20
509	9	Vip	20
510	10	Vip	20
511	11	Vip	20
512	12	Vip	20
513	13	Vip	20
514	14	Vip	20
515	15	Vip	20
516	16	Vip	20
517	17	Vip	20
518	18	Vip	20
519	19	Vip	20
520	20	Vip	20
521	21	Vip	20
522	22	Vip	20
523	23	Vip	20
524	24	Vip	20
525	25	Vip	20
526	26	Vip	20
527	27	Vip	20
528	28	Vip	20
529	29	Vip	20
530	30	Vip	20
531	31	normal	40
532	32	normal	40
533	33	normal	40
534	34	normal	40
535	35	normal	40
536	36	normal	40
537	37	normal	40
538	38	normal	40
539	39	normal	40
540	40	normal	40
541	41	normal	40
542	42	normal	40
543	43	normal	40
544	44	normal	40
545	45	normal	40
546	46	normal	40
547	47	normal	40
548	48	normal	40
549	49	normal	40
550	50	normal	40
551	1	Vip	40
552	2	Vip	40
553	3	Vip	40
554	4	Vip	40
555	5	Vip	40
556	6	Vip	40
557	7	Vip	40
558	8	Vip	40
559	9	Vip	40
560	10	Vip	40
561	11	Vip	40
562	12	Vip	40
563	13	Vip	40
564	14	Vip	40
565	15	Vip	40
566	16	Vip	40
567	17	Vip	40
568	18	Vip	40
569	19	Vip	40
570	20	Vip	40
571	1	Normal	20
572	2	Normal	20
573	3	Normal	20
574	4	Normal	20
575	5	Normal	20
576	6	Normal	20
577	7	Normal	20
578	8	Normal	20
579	9	Normal	20
580	10	Normal	20
581	11	Normal	20
582	12	Normal	20
583	13	Normal	20
584	14	Normal	20
585	15	Normal	20
586	16	Normal	20
587	17	Normal	20
588	18	Normal	20
589	19	Normal	20
590	20	Normal	20
591	1	Normal	20
592	2	Normal	20
593	3	Normal	20
594	4	Normal	20
595	5	Normal	20
596	6	Normal	20
597	7	Normal	20
598	8	Normal	20
599	9	Normal	20
600	10	Normal	20
601	11	Normal	20
602	12	Normal	20
603	13	Normal	20
604	14	Normal	20
605	15	Normal	20
606	16	Normal	20
607	17	Normal	20
608	18	Normal	20
609	19	Normal	20
610	20	Normal	20
611	1	normal	30
612	2	normal	30
613	3	normal	30
614	4	normal	30
615	5	normal	30
616	6	normal	30
617	7	normal	30
618	8	normal	30
619	9	normal	30
620	10	normal	30
621	11	normal	30
622	12	normal	30
623	13	normal	30
624	14	normal	30
625	15	normal	30
626	16	normal	30
627	17	normal	30
628	18	normal	30
629	19	normal	30
630	20	normal	30
631	21	normal	30
632	22	normal	30
633	23	normal	30
634	24	normal	30
635	25	normal	30
636	26	normal	30
637	27	normal	30
638	28	normal	30
639	29	normal	30
640	30	normal	30
641	1	Vip	10
642	2	Vip	10
643	3	Vip	10
644	4	Vip	10
645	5	Vip	10
646	6	Vip	10
647	7	Vip	10
648	8	Vip	10
649	9	Vip	10
650	10	Vip	10
651	11	Vip	10
652	12	Vip	10
653	13	Vip	10
654	14	Vip	10
655	15	Vip	10
656	16	Vip	10
657	17	Vip	10
658	18	Vip	10
659	19	Vip	10
660	20	Vip	10
661	21	Vip	10
662	22	Vip	10
663	23	Vip	10
664	24	Vip	10
665	25	Vip	10
666	26	Vip	10
667	27	Vip	10
668	28	Vip	10
669	29	Vip	10
670	30	Vip	10
671	31	Vip	10
672	32	Vip	10
673	33	Vip	10
674	34	Vip	10
675	35	Vip	10
676	36	Vip	10
677	37	Vip	10
678	38	Vip	10
679	39	Vip	10
680	40	Vip	10
681	41	Vip	10
682	42	Vip	10
683	43	Vip	10
684	44	Vip	10
685	45	Vip	10
686	46	Vip	10
687	47	Vip	10
688	48	Vip	10
689	49	Vip	10
690	50	Vip	10
691	1	Vip	32
692	2	Vip	32
693	3	Vip	32
694	4	Vip	32
695	5	Vip	32
696	6	Vip	32
697	7	Vip	32
698	8	Vip	32
699	9	Vip	32
700	10	Vip	32
701	11	Vip	32
702	12	Vip	32
703	13	Vip	32
704	14	Vip	32
705	15	Vip	32
706	16	Vip	32
707	17	Vip	32
708	18	Vip	32
709	19	Vip	32
710	20	Vip	32
711	21	Vip	32
712	22	Vip	32
713	23	Vip	32
714	24	Vip	32
715	25	Vip	32
716	26	Vip	32
717	27	Vip	32
718	28	Vip	32
719	29	Vip	32
720	30	Vip	32
721	31	Vip	32
722	32	Vip	32
\.


--
-- TOC entry 5077 (class 0 OID 24762)
-- Dependencies: 233
-- Data for Name: boleto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boleto (id_boleto, fecha_de_compra, id_asiento, id_fecha, id_hora, id_evento, id_usuario, precio, cod_unico_boleto) FROM stdin;
1	2025-08-11 23:46:40.031314-05	531	12	14	3	9	40	TICKET-54b0e4d26c683de0d14cee58370a3297
2	2025-08-11 23:51:39.287375-05	532	12	14	3	9	40	TICKET-6071bbd4bf4c83a9db0fef6baf08734a
3	2025-08-11 23:54:28.978169-05	533	12	14	3	9	40	TICKET-5c298f9632b949b86ca6c50329784893
4	2025-08-11 23:55:07.422721-05	534	12	14	3	9	40	TICKET-69f55d150b2e7a56fefb8fc9db4a6890
5	2025-08-11 23:56:39.799355-05	535	12	14	3	9	40	TICKET-8a3d3e8a075ab10539fe4357fcc78314
6	2025-08-11 23:56:55.964871-05	536	12	14	3	9	40	TICKET-12b5af19e504cc8ad5c72980330011ea
7	2025-08-11 23:58:18.637845-05	537	12	14	3	9	40	TICKET-cc7f1beb2fff195b128d7bac5ca1146e
8	2025-08-12 00:00:12.230209-05	571	12	14	3	9	20	TICKET-a8b279c8cf688f22f124b1b44f338e57
9	2025-08-12 00:02:07.852667-05	538	12	14	3	9	40	TICKET-5bdb49e88f23ca5ab9e17159adcf63af
10	2025-08-12 00:07:38.576369-05	539	12	14	3	9	40	TICKET-a83013757c6ad32698e68e21ba361c87
11	2025-08-12 00:16:09.481784-05	540	12	14	3	9	40	TICKET-a331cd3a39531684a33d26adc1807ca1
12	2025-08-12 00:16:09.481784-05	541	12	14	3	9	40	TICKET-a331cd3a39531684a33d26adc1807ca1
13	2025-08-12 00:22:41.403658-05	531	16	18	5	9	40	TICKET-8299904d662b9dd9cf3acb77578f79bd
14	2025-08-12 00:22:41.403658-05	532	16	18	5	9	40	TICKET-8299904d662b9dd9cf3acb77578f79bd
16	2025-08-12 09:33:03.809671-05	571	15	17	5	1	20	TICKET-8ee8628483b005676ef2d8449136c063
17	2025-08-12 09:46:47.60099-05	542	12	14	3	1	40	TICKET-c41332816589011ea8ab312db1c3a9c4
18	2025-08-12 09:50:45.987324-05	543	12	14	3	1	40	TICKET-d77d8f0b3b4b011e3b08bf6ecfa124f7
19	2025-08-12 09:52:38.898102-05	544	12	14	3	1	40	TICKET-1df6b0ce8c7d6b7e6996d3b63fc2ea68
20	2025-08-12 09:57:15.721758-05	545	12	14	3	1	40	TICKET-785568b88d13eec9d8e75e5e41303019
21	2025-08-12 10:01:58.06663-05	533	16	18	5	1	40	TICKET-9293bf6d04f91083fb5c4ede8e3d903a
22	2025-08-12 10:13:27.886672-05	546	12	14	3	1	40	TICKET-2e990020aa7a566f16ee7aa94325604d
23	2025-08-12 10:13:27.886672-05	547	12	14	3	1	40	TICKET-2e990020aa7a566f16ee7aa94325604d
24	2025-08-12 10:18:07.988842-05	548	12	14	3	1	40	TICKET-66b70489e53dd029cbc9f4affd8197e1
25	2025-08-12 10:23:39.581403-05	549	12	14	3	1	40	TICKET-231d5be798586bb8f88026cd1f8d6aa3
26	2025-08-12 10:31:20.149888-05	550	12	14	3	1	40	TICKET-6d06ad5a6a5c95bf1a9eee0cf062011f
27	2025-08-12 10:35:39.963371-05	611	12	14	3	1	30	TICKET-7c09ee5ff2d218b62f716b7610e46c63
28	2025-08-12 10:37:42.290142-05	612	12	14	3	1	30	TICKET-9d662761d4fed55d66e196595071a7c3
29	2025-08-12 10:38:44.979171-05	613	12	14	3	1	30	TICKET-7a13bb247725050bbbc3707ee7fbd83f
30	2025-08-12 10:39:17.877331-05	534	16	18	5	1	40	TICKET-4a0d4969e3194551305f7028c0215b5f
31	2025-08-12 10:42:03.104944-05	614	12	14	3	1	30	TICKET-c52b7654d6bcc19cf15da375b1219fef
32	2025-08-12 10:58:02.461758-05	615	12	14	3	1	30	TICKET-407e4189f2b000157cdb84a467cf7383
33	2025-08-12 10:59:58.648705-05	531	15	17	5	1	40	TICKET-4a58314711bc38a65c85ba0d81ff185b
\.


--
-- TOC entry 5079 (class 0 OID 24796)
-- Dependencies: 235
-- Data for Name: ciudad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ciudad (id_ciudad, nombre_ciudad, id_pais) FROM stdin;
7	Quito	10
2	Buenos aires	2
3	Portoviejo	10
4	Ciudad2	3
5	Caracas	4
\.


--
-- TOC entry 5067 (class 0 OID 24643)
-- Dependencies: 223
-- Data for Name: evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento (id_evento, nombre_evento, tipo_de_evento, id_artista, imagen_nombre) FROM stdin;
3	Fiesta	Fiesta	2	1754807698834.jpg
5	Farruko concierto	concierto	7	1754969069575.jpg
\.


--
-- TOC entry 5080 (class 0 OID 24810)
-- Dependencies: 236
-- Data for Name: evento_fechas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento_fechas (id_evento, id_fechas) FROM stdin;
3	12
5	15
5	16
\.


--
-- TOC entry 5069 (class 0 OID 24665)
-- Dependencies: 225
-- Data for Name: fechas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fechas (id_fecha, fecha) FROM stdin;
12	2025-08-10
15	2025-08-23
16	2025-08-24
\.


--
-- TOC entry 5081 (class 0 OID 24824)
-- Dependencies: 237
-- Data for Name: fechas_hora; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fechas_hora (id_fecha, id_hora) FROM stdin;
12	14
15	17
16	18
\.


--
-- TOC entry 5071 (class 0 OID 24679)
-- Dependencies: 227
-- Data for Name: hora; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hora (id_hora, hora) FROM stdin;
14	20:30:00
17	21:23:00
18	21:23:00
\.


--
-- TOC entry 5083 (class 0 OID 24839)
-- Dependencies: 239
-- Data for Name: lugar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lugar (id_lugar, nombre_lugar, capacidad, id_ciudad) FROM stdin;
2	Estadio	900	2
3	Lux	350	3
4	lux	320	3
5	Discoteca	50	4
6	Discoteca	50	4
7	El bar	60	5
8	Casa cultura	550	3
9	Reales tamarindo	82	3
\.


--
-- TOC entry 5086 (class 0 OID 32772)
-- Dependencies: 242
-- Data for Name: lugar_asiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lugar_asiento (id_lugar, id_asiento) FROM stdin;
2	1
2	2
2	3
2	4
2	5
2	6
2	7
2	8
2	9
2	10
2	11
2	12
2	13
2	14
2	15
2	16
2	17
2	18
2	19
2	20
2	21
2	22
2	23
2	24
2	25
2	26
2	27
2	28
2	29
2	30
2	31
2	32
2	33
2	34
2	35
2	36
2	37
2	38
2	39
2	40
2	41
2	42
2	43
2	44
2	45
2	46
2	47
2	48
2	49
2	50
2	51
2	52
2	53
2	54
2	55
2	56
2	57
2	58
2	59
2	60
2	61
2	62
2	63
2	64
2	65
2	66
2	67
2	68
2	69
2	70
2	71
2	72
2	73
2	74
2	75
2	76
2	77
2	78
2	79
2	80
2	81
2	82
2	83
2	84
2	85
2	86
2	87
2	88
2	89
2	90
2	91
2	92
2	93
2	94
2	95
2	96
2	97
2	98
2	99
2	100
2	101
2	102
2	103
2	104
2	105
2	106
2	107
2	108
2	109
2	110
2	111
2	112
2	113
2	114
2	115
2	116
2	117
2	118
2	119
2	120
2	121
2	122
2	123
2	124
2	125
2	126
2	127
2	128
2	129
2	130
2	131
2	132
2	133
2	134
2	135
2	136
2	137
2	138
2	139
2	140
2	141
2	142
2	143
2	144
2	145
2	146
2	147
2	148
2	149
2	150
2	151
2	152
2	153
2	154
2	155
2	156
2	157
2	158
2	159
2	160
2	161
2	162
2	163
2	164
2	165
2	166
2	167
2	168
2	169
2	170
2	171
2	172
2	173
2	174
2	175
2	176
2	177
2	178
2	179
2	180
2	181
2	182
2	183
2	184
2	185
2	186
2	187
2	188
2	189
2	190
2	191
2	192
2	193
2	194
2	195
2	196
2	197
2	198
2	199
2	200
2	201
2	202
2	203
2	204
2	205
2	206
2	207
2	208
2	209
2	210
2	211
2	212
2	213
2	214
2	215
2	216
2	217
2	218
2	219
2	220
2	221
2	222
2	223
2	224
2	225
2	226
2	227
2	228
2	229
2	230
2	231
2	232
2	233
2	234
2	235
2	236
2	237
2	238
2	239
2	240
2	241
2	242
2	243
2	244
2	245
2	246
2	247
2	248
2	249
2	250
2	251
2	252
2	253
2	254
2	255
2	256
2	257
2	258
2	259
2	260
2	261
2	262
2	263
2	264
2	265
2	266
2	267
2	268
2	269
2	270
2	271
2	272
2	273
2	274
2	275
2	276
2	277
2	278
2	279
2	280
2	281
2	282
2	283
2	284
2	285
2	286
2	287
2	288
2	289
2	290
2	291
2	292
2	293
2	294
2	295
2	296
2	297
2	298
2	299
2	300
2	301
2	302
2	303
2	304
2	305
2	306
2	307
2	308
2	309
2	310
2	311
2	312
2	313
2	314
2	315
2	316
2	317
2	318
2	319
2	320
2	321
2	322
2	323
2	324
2	325
2	326
2	327
2	328
2	329
2	330
2	331
2	332
2	333
2	334
2	335
2	336
2	337
2	338
2	339
2	340
2	341
2	342
2	343
2	344
2	345
2	346
2	347
2	348
2	349
2	350
2	351
2	352
2	353
2	354
2	355
2	356
2	357
2	358
2	359
2	360
2	361
2	362
2	363
2	364
2	365
2	366
2	367
2	368
2	369
2	370
2	371
2	372
2	373
2	374
2	375
2	376
2	377
2	378
2	379
2	380
2	381
2	382
2	383
2	384
2	385
2	386
2	387
2	388
2	389
2	390
2	391
2	392
2	393
2	394
2	395
2	396
2	397
2	398
2	399
2	400
2	401
2	402
2	403
2	404
2	405
2	406
2	407
2	408
2	409
2	410
2	411
2	412
2	413
2	414
2	415
2	416
2	417
2	418
2	419
2	420
2	421
2	422
2	423
2	424
2	425
2	426
2	427
2	428
2	429
2	430
2	431
2	432
2	433
2	434
2	435
2	436
2	437
2	438
2	439
2	440
2	441
2	442
2	443
2	444
2	445
2	446
2	447
2	448
2	449
2	450
2	451
2	452
2	453
2	454
2	455
2	456
2	457
2	458
2	459
2	460
2	461
2	462
2	463
2	464
2	465
2	466
2	467
2	468
2	469
2	470
2	471
2	472
2	473
2	474
2	475
2	476
2	477
2	478
2	479
2	480
2	481
2	482
2	483
2	484
2	485
2	486
2	487
2	488
2	489
2	490
2	491
2	492
2	493
2	494
2	495
2	496
2	497
2	498
2	499
2	500
3	501
3	502
3	503
3	504
3	505
3	506
3	507
3	508
3	509
3	510
3	511
3	512
3	513
3	514
3	515
3	516
3	517
3	518
3	519
3	520
3	521
3	522
3	523
3	524
3	525
3	526
3	527
3	528
3	529
3	530
3	531
3	532
3	533
3	534
3	535
3	536
3	537
3	538
3	539
3	540
3	541
3	542
3	543
3	544
3	545
3	546
3	547
3	548
3	549
3	550
4	551
4	552
4	553
4	554
4	555
4	556
4	557
4	558
4	559
4	560
4	561
4	562
4	563
4	564
4	565
4	566
4	567
4	568
4	569
4	570
5	571
5	572
5	573
5	574
5	575
5	576
5	577
5	578
5	579
5	580
5	581
5	582
5	583
5	584
5	585
5	586
5	587
5	588
5	589
5	590
6	591
6	592
6	593
6	594
6	595
6	596
6	597
6	598
6	599
6	600
6	601
6	602
6	603
6	604
6	605
6	606
6	607
6	608
6	609
6	610
7	611
7	612
7	613
7	614
7	615
7	616
7	617
7	618
7	619
7	620
7	621
7	622
7	623
7	624
7	625
7	626
7	627
7	628
7	629
7	630
7	631
7	632
7	633
7	634
7	635
7	636
7	637
7	638
7	639
7	640
8	641
8	642
8	643
8	644
8	645
8	646
8	647
8	648
8	649
8	650
8	651
8	652
8	653
8	654
8	655
8	656
8	657
8	658
8	659
8	660
8	661
8	662
8	663
8	664
8	665
8	666
8	667
8	668
8	669
8	670
8	671
8	672
8	673
8	674
8	675
8	676
8	677
8	678
8	679
8	680
8	681
8	682
8	683
8	684
8	685
8	686
8	687
8	688
8	689
8	690
9	691
9	692
9	693
9	694
9	695
9	696
9	697
9	698
9	699
9	700
9	701
9	702
9	703
9	704
9	705
9	706
9	707
9	708
9	709
9	710
9	711
9	712
9	713
9	714
9	715
9	716
9	717
9	718
9	719
9	720
9	721
9	722
\.


--
-- TOC entry 5084 (class 0 OID 24852)
-- Dependencies: 240
-- Data for Name: lugar_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lugar_evento (id_lugar, id_evento) FROM stdin;
5	3
5	3
7	3
3	5
4	5
5	5
5	5
\.


--
-- TOC entry 5085 (class 0 OID 24865)
-- Dependencies: 241
-- Data for Name: pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pago (id_pago, fecha_pago, id_usuario) FROM stdin;
\.


--
-- TOC entry 5073 (class 0 OID 24709)
-- Dependencies: 229
-- Data for Name: pais; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pais (id_pais, nombre_pais) FROM stdin;
10	Ecuador
2	Argentina
3	Guatemala
4	Venezuela
\.


--
-- TOC entry 5088 (class 0 OID 41128)
-- Dependencies: 244
-- Data for Name: reporte_boleto_cancelados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reporte_boleto_cancelados (id_reporte, id_boleto, fecha_de_compra, id_asiento, num_asiento, id_fecha, fecha, id_hora, hora, id_evento, nombre_evento, id_usuario, correo, precio, cod_unico_boleto, fecha_cancelacion) FROM stdin;
1	7	2025-07-21 12:58:23.225489-05	1	\N	18	\N	29	\N	12	\N	1	\N	5.3	 dedefefg	2025-07-21 12:59:36.695648-05
2	7	2025-07-21 12:58:23.225489-05	1	1	18	2025-08-15	29	18:00:00	12	Concierto de Salsa	1	tbucheli20@gmail.com	5.3	 dedefefg	2025-07-21 12:59:36.695648-05
3	10	2025-07-21 13:03:35.114278-05	1	\N	20	\N	33	\N	13	\N	1	\N	5.3	 dedefefg	2025-07-21 13:05:31.314748-05
4	10	2025-07-21 13:03:35.114278-05	1	1	20	2025-08-15	33	18:00:00	13	Concierto de Salsa	1	tbucheli20@gmail.com	5.3	 dedefefg	2025-07-21 13:05:31.314748-05
5	2	2025-07-22 22:11:37.924732-05	1	1	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-fc305cc18b0c2f437685766564c0a459	2025-07-22 22:16:33.818027-05
6	3	2025-07-22 22:11:37.924732-05	2	2	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-fc305cc18b0c2f437685766564c0a459	2025-07-22 22:16:33.818027-05
7	4	2025-07-22 22:11:37.924732-05	3	3	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-fc305cc18b0c2f437685766564c0a459	2025-07-22 22:16:33.818027-05
8	5	2025-07-22 22:16:39.326737-05	1	1	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-9fe84f35f1cb73a0a5d04b6e0d6368b3	2025-07-22 22:18:03.294619-05
9	6	2025-07-22 22:16:39.326737-05	2	2	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-9fe84f35f1cb73a0a5d04b6e0d6368b3	2025-07-22 22:18:03.294619-05
10	7	2025-07-22 22:16:39.326737-05	3	3	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-9fe84f35f1cb73a0a5d04b6e0d6368b3	2025-07-22 22:18:03.294619-05
11	8	2025-07-22 22:18:23.278601-05	1	1	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-5cfd0d3552396009999fe312ef0aaf31	2025-07-22 22:21:42.987628-05
12	9	2025-07-22 22:18:23.278601-05	2	2	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-5cfd0d3552396009999fe312ef0aaf31	2025-07-22 22:21:42.987628-05
13	10	2025-07-22 22:18:23.278601-05	3	3	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-5cfd0d3552396009999fe312ef0aaf31	2025-07-22 22:21:42.987628-05
14	12	2025-07-22 22:22:27.595761-05	1	1	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-f2f707540b5b48f3e7a40911a62388fb	2025-07-22 22:37:55.736975-05
15	13	2025-07-22 22:22:27.595761-05	2	2	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-f2f707540b5b48f3e7a40911a62388fb	2025-07-22 22:37:55.736975-05
16	14	2025-07-22 22:22:27.595761-05	3	3	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-f2f707540b5b48f3e7a40911a62388fb	2025-07-22 22:37:55.736975-05
17	15	2025-07-22 22:41:41.101208-05	1	1	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-b00eb675b6315381915bb787be134dbf	2025-07-22 22:53:24.251084-05
18	16	2025-07-22 22:41:41.101208-05	2	2	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-b00eb675b6315381915bb787be134dbf	2025-07-22 22:53:24.251084-05
19	17	2025-07-22 22:41:41.101208-05	3	3	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-b00eb675b6315381915bb787be134dbf	2025-07-22 22:53:24.251084-05
20	18	2025-07-22 22:53:41.557701-05	1	1	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-95cfbae9397add752ea58201184f5bcf	2025-08-09 16:40:43.381748-05
21	19	2025-07-22 22:53:41.557701-05	2	2	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-95cfbae9397add752ea58201184f5bcf	2025-08-09 16:40:43.381748-05
22	20	2025-07-22 22:53:41.557701-05	3	3	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-95cfbae9397add752ea58201184f5bcf	2025-08-09 16:40:43.381748-05
23	21	2025-08-04 10:59:29.097011-05	6	6	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-bc7a0da36be0893cc6200ae5bcbfc564	2025-08-09 16:40:43.381748-05
24	22	2025-08-04 11:08:22.081563-05	4	4	22	2025-08-15	38	21:00:00	14	Concierto de Salsa	9	tbucheli4217@utm.edu.ec	10	TICKET-aa57e5f3bead78497e0b7699178bcb79	2025-08-09 16:40:43.381748-05
25	15	2025-08-12 00:36:55.75737-05	542	42	12	2025-08-10	14	20:30:00	3	Fiesta	9	tbucheli4217@utm.edu.ec	40	TICKET-8ffc7b472288835a4010a3fa9d7e9b4f	2025-08-12 00:39:38.614827-05
\.


--
-- TOC entry 5075 (class 0 OID 24728)
-- Dependencies: 231
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nombres, apellidos, cedula, correo, password, admin, "createdAt", "updatedAt", verificado) FROM stdin;
21	tito	bucheli	1231231232	tito@exampl3.com	$2b$10$IXJe7awJ.OmlVXAWrHMCYOiGzjvuRa6d0RhTNhtDHR8IFpuLLszKe	f	2025-08-07 03:20:34.792	2025-08-07 03:20:34.792	f
18	tito	bucheli	1231231231	tito@example.com	$2b$10$fe.Y3p4r88UVzxLM12HD8OH9QVsK2fctQEzpKtXfrPyHzjwRN.TsK	f	2025-08-07 03:20:16.674	2025-08-07 03:27:33.07	t
22	tito	bucheli	1231412232	tito@xdxdd.sd	$2b$10$8nYLeVUjh.MTlAc1ewZoue5pOqQWPQMyb2yaFHOqoT06f1HzP0VQG	f	2025-08-07 03:32:38.853	2025-08-07 03:33:07.07	t
1	Tito	Bucheli	1350054217	tbucheli20@gmail.com	$2b$10$zr55bQzhv1urEOgHftHM/O8elaSdPWXPtEt6Hi2hF3r994lKLg0C.	t	2025-07-17 23:28:35.784591	2025-07-17 23:28:35.784591	t
2	tito	bucheli	1234212312	tito20022004@outlook.es	$2b$10$Rt3sqTTDMwhcxR15r2pq7eqUNR6S6qxLqZLCf90Ky9Ix/ALBhpgsS	f	2025-08-06 20:01:39.207	2025-08-06 20:08:39.502	t
17	tito	bucheli	1234354678	sa@sff.com	$2b$10$cjQpUEJXZOMuizRM3hra3eYH0qkPOzJiIgrFl4EvTWyi3AvKiUePW	f	2025-08-07 00:27:14.916	2025-08-07 00:27:14.916	f
9	Dan	Doe	1981244321	tbucheli4217@utm.edu.ec	$2b$10$H.rnSTyQzK45Il/XhT6NlemX/VWw5Z/b.5w7MwGO33gMG6u0ZbO/.	f	2025-07-18 04:34:37.791	2025-08-07 17:23:17.695	t
13	Juan	Pérez	1234567890	xerconth@gmail.com	$2b$10$Yugf8mwpAb14Qxyy50FmJuD4n0H.1kU493iRH8.WwQP91NNOhoUHS	f	2025-07-18 19:17:20.855	2025-08-13 04:13:05.81	t
\.


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 218
-- Name: artista_id_artista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artista_id_artista_seq', 9, true);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 220
-- Name: asiento_id_asiento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asiento_id_asiento_seq', 722, true);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 232
-- Name: boleto_id_boleto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boleto_id_boleto_seq', 33, true);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 234
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciudad_id_ciudad_seq', 5, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 222
-- Name: evento_id_evento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evento_id_evento_seq', 5, true);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 224
-- Name: fechas_id_fecha_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fechas_id_fecha_seq', 16, true);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 226
-- Name: hora_id_hora_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hora_id_hora_seq', 18, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 238
-- Name: lugar_id_lugar_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lugar_id_lugar_seq', 9, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 228
-- Name: pais_id_pais_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pais_id_pais_seq', 4, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 243
-- Name: reporte_boleto_cancelados_id_reporte_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reporte_boleto_cancelados_id_reporte_seq', 25, true);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 230
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 22, true);


--
-- TOC entry 4862 (class 2606 OID 24610)
-- Name: artista artista_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artista
    ADD CONSTRAINT artista_pkey PRIMARY KEY (id_artista);


--
-- TOC entry 4864 (class 2606 OID 24620)
-- Name: asiento asiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asiento
    ADD CONSTRAINT asiento_pkey PRIMARY KEY (id_asiento);


--
-- TOC entry 4884 (class 2606 OID 24769)
-- Name: boleto boleto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_pkey PRIMARY KEY (id_boleto);


--
-- TOC entry 4886 (class 2606 OID 41144)
-- Name: boleto boleto_unico_por_evento_asiento_fecha_hora; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_unico_por_evento_asiento_fecha_hora UNIQUE (id_evento, id_asiento, id_fecha, id_hora);


--
-- TOC entry 4888 (class 2606 OID 24803)
-- Name: ciudad ciudad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT ciudad_pkey PRIMARY KEY (id_ciudad);


--
-- TOC entry 4866 (class 2606 OID 24650)
-- Name: evento evento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id_evento);


--
-- TOC entry 4868 (class 2606 OID 24669)
-- Name: fechas fechas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fechas
    ADD CONSTRAINT fechas_pkey PRIMARY KEY (id_fecha);


--
-- TOC entry 4870 (class 2606 OID 24684)
-- Name: hora hora_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hora
    ADD CONSTRAINT hora_pkey PRIMARY KEY (id_hora);


--
-- TOC entry 4890 (class 2606 OID 24846)
-- Name: lugar lugar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lugar
    ADD CONSTRAINT lugar_pkey PRIMARY KEY (id_lugar);


--
-- TOC entry 4892 (class 2606 OID 32910)
-- Name: pago pago_id_pago_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_pago_key UNIQUE (id_pago);


--
-- TOC entry 4894 (class 2606 OID 24950)
-- Name: pago pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);


--
-- TOC entry 4872 (class 2606 OID 24716)
-- Name: pais pais_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pais
    ADD CONSTRAINT pais_pkey PRIMARY KEY (id_pais);


--
-- TOC entry 4896 (class 2606 OID 41136)
-- Name: reporte_boleto_cancelados reporte_boleto_cancelados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reporte_boleto_cancelados
    ADD CONSTRAINT reporte_boleto_cancelados_pkey PRIMARY KEY (id_reporte);


--
-- TOC entry 4874 (class 2606 OID 24742)
-- Name: usuario usuario_cedula_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cedula_key UNIQUE (cedula);


--
-- TOC entry 4876 (class 2606 OID 24974)
-- Name: usuario usuario_cedula_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cedula_unique UNIQUE (cedula);


--
-- TOC entry 4878 (class 2606 OID 24744)
-- Name: usuario usuario_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);


--
-- TOC entry 4880 (class 2606 OID 24972)
-- Name: usuario usuario_correo_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_unique UNIQUE (correo);


--
-- TOC entry 4882 (class 2606 OID 24740)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4914 (class 2620 OID 41141)
-- Name: boleto trg_reporte_cancelados; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_reporte_cancelados BEFORE DELETE ON public.boleto FOR EACH ROW EXECUTE FUNCTION public.generar_reporte_boleto_cancelados();


--
-- TOC entry 4898 (class 2606 OID 24790)
-- Name: boleto boleto_id_asiento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_id_asiento_fkey FOREIGN KEY (id_asiento) REFERENCES public.asiento(id_asiento);


--
-- TOC entry 4899 (class 2606 OID 24770)
-- Name: boleto boleto_id_evento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_id_evento_fkey FOREIGN KEY (id_evento) REFERENCES public.evento(id_evento);


--
-- TOC entry 4900 (class 2606 OID 24775)
-- Name: boleto boleto_id_fecha_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_id_fecha_fkey FOREIGN KEY (id_fecha) REFERENCES public.fechas(id_fecha);


--
-- TOC entry 4901 (class 2606 OID 24780)
-- Name: boleto boleto_id_hora_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_id_hora_fkey FOREIGN KEY (id_hora) REFERENCES public.hora(id_hora);


--
-- TOC entry 4902 (class 2606 OID 24785)
-- Name: boleto boleto_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boleto
    ADD CONSTRAINT boleto_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 4903 (class 2606 OID 24804)
-- Name: ciudad ciudad_id_pais_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT ciudad_id_pais_fkey FOREIGN KEY (id_pais) REFERENCES public.pais(id_pais);


--
-- TOC entry 4904 (class 2606 OID 24813)
-- Name: evento_fechas evento_fechas_id_evento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento_fechas
    ADD CONSTRAINT evento_fechas_id_evento_fkey FOREIGN KEY (id_evento) REFERENCES public.evento(id_evento);


--
-- TOC entry 4905 (class 2606 OID 24818)
-- Name: evento_fechas evento_fechas_id_fechas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento_fechas
    ADD CONSTRAINT evento_fechas_id_fechas_fkey FOREIGN KEY (id_fechas) REFERENCES public.fechas(id_fecha);


--
-- TOC entry 4897 (class 2606 OID 24651)
-- Name: evento evento_id_artista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_id_artista_fkey FOREIGN KEY (id_artista) REFERENCES public.artista(id_artista);


--
-- TOC entry 4906 (class 2606 OID 24827)
-- Name: fechas_hora fechas_hora_id_fecha_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fechas_hora
    ADD CONSTRAINT fechas_hora_id_fecha_fkey FOREIGN KEY (id_fecha) REFERENCES public.fechas(id_fecha);


--
-- TOC entry 4907 (class 2606 OID 24832)
-- Name: fechas_hora fechas_hora_id_hora_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fechas_hora
    ADD CONSTRAINT fechas_hora_id_hora_fkey FOREIGN KEY (id_hora) REFERENCES public.hora(id_hora);


--
-- TOC entry 4912 (class 2606 OID 32780)
-- Name: lugar_asiento lugar_asiento_id_asiento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lugar_asiento
    ADD CONSTRAINT lugar_asiento_id_asiento_fkey FOREIGN KEY (id_asiento) REFERENCES public.asiento(id_asiento);


--
-- TOC entry 4913 (class 2606 OID 32775)
-- Name: lugar_asiento lugar_asiento_id_lugar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lugar_asiento
    ADD CONSTRAINT lugar_asiento_id_lugar_fkey FOREIGN KEY (id_lugar) REFERENCES public.lugar(id_lugar);


--
-- TOC entry 4909 (class 2606 OID 24855)
-- Name: lugar_evento lugar_evento_id_evento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lugar_evento
    ADD CONSTRAINT lugar_evento_id_evento_fkey FOREIGN KEY (id_evento) REFERENCES public.evento(id_evento);


--
-- TOC entry 4910 (class 2606 OID 24860)
-- Name: lugar_evento lugar_evento_id_lugar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lugar_evento
    ADD CONSTRAINT lugar_evento_id_lugar_fkey FOREIGN KEY (id_lugar) REFERENCES public.lugar(id_lugar);


--
-- TOC entry 4908 (class 2606 OID 24847)
-- Name: lugar lugar_id_ciudad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lugar
    ADD CONSTRAINT lugar_id_ciudad_fkey FOREIGN KEY (id_ciudad) REFERENCES public.ciudad(id_ciudad);


--
-- TOC entry 4911 (class 2606 OID 24871)
-- Name: pago pago_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


-- Completed on 2025-08-13 00:34:26

--
-- PostgreSQL database dump complete
--

