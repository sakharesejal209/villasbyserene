export const track = (
  event: string,
  params: Record<string, any> = {},
  eventId?: string,
) => {
  (window as any).fbq?.(
    "track",
    event,
    params,
    eventId ? { eventID: eventId } : undefined,
  );
};

export const trackCustom = (
  event: string,
  params: Record<string, any> = {},
) => {
  (window as any).fbq?.("trackCustom", event, params);
};
