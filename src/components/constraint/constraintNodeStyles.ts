export function getConstraintNodeStyle(
  isSingle: boolean,
  isEmpty: boolean,
  isBeingEvaluated: boolean,
) {
  if (isSingle) {
    return {
      circleClassName: "fill-primary/15 stroke-primary",
      textClassName: "fill-foreground",
      domainClassName: "fill-primary",
    };
  }
  if (isEmpty) {
    return {
      circleClassName: "fill-destructive/15 stroke-destructive",
      textClassName: "fill-destructive",
      domainClassName: "fill-destructive",
    };
  }
  if (isBeingEvaluated) {
    return {
      circleClassName: "fill-accent stroke-accent-foreground",
      textClassName: "fill-accent-foreground",
      domainClassName: "fill-accent-foreground",
    };
  }
  return {
    circleClassName: "fill-card stroke-border",
    textClassName: "fill-foreground",
    domainClassName: "fill-muted-foreground",
  };
}
