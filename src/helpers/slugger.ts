type SluggerArgs = {
  text: string;
};

const Slugger = ({ text }: SluggerArgs): string => {
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "-"); // Remove all non-word chars
  return slug;
};

export default Slugger;
