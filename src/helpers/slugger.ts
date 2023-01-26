type SluggerArgs = {
  text: string;
};

const Slugger = ({ text }: SluggerArgs): string => {
  const slug: string = text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "")
    .replace(/ /g, "-"); // Remove all non-word chars
  return slug;
};

export default Slugger;
