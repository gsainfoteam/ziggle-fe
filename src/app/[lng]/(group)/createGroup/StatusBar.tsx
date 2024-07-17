interface StatusBarProps {
  maxStep: number;
  currentStep: number;
}

const StatusBar = ({ maxStep, currentStep }: StatusBarProps) => {
  if (currentStep > maxStep) {
    throw new Error('currentStep is bigger than maxStep');
  }
  if (currentStep < 1) {
    throw new Error('currentStep cannot be lower than 1');
  }
  if (maxStep < 1) {
    throw new Error('maxStep cannot be lower than 1');
  }

  const repetition = Array.from({ length: maxStep }, (x, i) => i + 1);

  return (
    <div className="flex h-[5px] w-full justify-between gap-[5px]">
      {repetition.map((bar) => (
        <div
          key={bar}
          className={[
            'grow',
            'h-full',
            bar === currentStep ? 'bg-primary' : 'bg-greyLight',
          ].join(' ')}
        ></div>
      ))}
    </div>
  );
};

export default StatusBar;
