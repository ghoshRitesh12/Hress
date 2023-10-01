/**
 * @name formatClass
 * @param classes unformatted class names
 * @returns formatted class names
*/
export default function fc(classes = " ") {
  return classes.replace(/[\s]+/g, " ").trim();
}