import { CustomError } from "../features/shared/classes";

export function catchFetchErrors(
  e: unknown,
  entity: string,
  guid: string
): never {
  if (e instanceof CustomError && e.errorCode === 401)
    throw new Response("Unauthorized", { status: 401 }); // Todo: Better message is needed.

  if (e instanceof CustomError && e.errorCode === 403)
    throw new Response("Forbidden", { status: 403 }); // Todo: Better message is needed.

  if (e instanceof CustomError && e.errorCode === 404)
    throw new Response(`Could not find a ${entity} with id: ${guid}`, {
      status: 404,
    });

  const msg = e instanceof Error ? e.message : `Failed to load ${entity}`;
  throw new Response(msg, { status: 502 });
}
