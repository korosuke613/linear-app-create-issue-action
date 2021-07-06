export const parseEmbed = (inputEmbed: string) => {
  if (inputEmbed === "" || inputEmbed === undefined) {
    return undefined;
  }
  const splitEmbed = inputEmbed.split(",");
  const recordedEmbed: { [x: string]: string } = {};
  for (const e of splitEmbed) {
    const keyAndValue = e.split("=");
    recordedEmbed[keyAndValue[0]] = keyAndValue[1];
  }

  return recordedEmbed;
};
