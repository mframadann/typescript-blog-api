export default interface IRouters {
  readonly getMethods: () => void;
  readonly postMethods: () => void;
  readonly putMethods: () => void;
  readonly deleteMethods: () => void;
}
