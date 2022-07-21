export const OkResponse = (message: string, img: string) => {
  return {
    image: { url: img },
    caption: `*Status: Sucesso*\n${message}.`,
  };
};

export const response = (message: string, type = true) => {
  return `${type ? '*Status: Sucesso*' : '*Status: Error*'}\n${message}.`;
};
