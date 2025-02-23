import { KeyboardEvent, MouseEvent } from "react";

function triggerCallbackOnClickOrOnKeydown(
  e: MouseEvent | KeyboardEvent,
  callback: () => void,
) {
  if (e.type === "click") return callback();

  const keyboardEvent = e as KeyboardEvent;
  if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") callback();
}

function getAttribute(
  e: MouseEvent,
  closest: string,
  attribute: string,
): string {
  const { target } = e;

  const element = (target as HTMLAreaElement).closest(closest);
  return element?.getAttribute(attribute) ?? "";
}

function getClientIP(headersList: Headers) {
  const xForwardedFor = headersList.get("x-forwarded-for");
  return xForwardedFor ? xForwardedFor.split(",")[0] : "127.0.0.1";
}

function cleanString(
  str: string,
  charsToRepalce: Record<string, string> = {
    " ": "-",
    ":": "",
    "&": "",
    ".": "",
  },
  toCase: "LOWER" | "UPPER" = "LOWER",
  encodedURI: boolean = true,
) {
  function getStr(str: string) {
    switch (toCase) {
      case "LOWER":
        return str.toLowerCase();
      case "UPPER":
        return str.toUpperCase();
      default:
        return str;
    }
  }

  let result = str;
  for (const [char, replacement] of Object.entries(charsToRepalce))
    result = result.split(char).join(replacement);

  return encodedURI ? encodeURIComponent(getStr(result)) : getStr(result);
}

function getCompactNotation(value: string | number) {
  if (typeof value === "string") {
    value = parseInt(value, 10);
    if (isNaN(value)) {
      throw new Error(
        "Invalid number input: Unable to parse string to a valid number",
      );
    }
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
}

function getTitleWithSeasonNumber(season: number, title: string) {
  if (season <= 0) return title;

  return `S${season}: ${title}`;
}

function getTitleWithSeasonAndEpisodeNumber(
  season: number,
  episode: string,
  title: string,
  join: string = " - ",
) {
  let transformedTitle = "";
  if (season > 0) transformedTitle += `S${season} `;
  if (episode) {
    episode = isNaN(parseInt(episode)) ? `-${episode}` : episode;
    transformedTitle = `${transformedTitle}E${episode}${join}`;
  }

  return `${transformedTitle}${title}`;
}

function getLocaleDate(dateString: string | Date, locale?: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const resolvedLocale =
    locale ?? (typeof window !== "undefined" ? navigator.language : "en-US");

  return date.toLocaleDateString(resolvedLocale);
}

function getReadableDate(dateString: string | Date) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function timeToFormattedTime(seconds: number): string {
  if (!seconds || seconds < 0) return "00:00";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let formattedTime = "";

  if (days > 0) formattedTime += `${days}:`;
  if (hours > 0 || days > 0)
    formattedTime += `${String(hours).padStart(2, "0")}:`;
  formattedTime += `${String(minutes).padStart(2, "0")}:`;
  formattedTime += `${String(secs).padStart(2, "0")}`;

  return formattedTime;
}

export {
  triggerCallbackOnClickOrOnKeydown,
  getAttribute,
  getClientIP,
  cleanString,
  getCompactNotation,
  getTitleWithSeasonNumber,
  getTitleWithSeasonAndEpisodeNumber,
  getLocaleDate,
  getReadableDate,
  timeToFormattedTime,
};
