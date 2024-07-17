interface StatusBarProps {
  maxStep: number;
  currentStep: number;
}

const StatusBar = async ({ maxStep, currentStep }: StatusBarProps) => {
  if (currentStep > maxStep) {
    throw new Error('currentStep is bigger than maxStep');
  }
  if (currentStep < 1) {
    throw new Error('currentStep cannot be lower than 1');
  }
  if (maxStep < 1) {
    throw new Error('maxStep cannot be lower than 1');
  }

  const repetition = new Array(maxStep);

  return (
    <div className="flex h-[5px] w-full justify-between gap-[5px]">
      {repetition.map((bar, index) => (
        <div
          key={index}
          className={[
            'grow',
            'h-full',
            index + 1 === currentStep ? 'bg-primary' : 'bg-greyLight',
          ].join(' ')}
        ></div>
      ))}
    </div>
  );
};

export default StatusBar;
