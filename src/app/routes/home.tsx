import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/store/counterStore";

const HomePage = () => {
  const { counter, increment, decrement, reset } = useCounterStore();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>Count: {counter.count}</p>
      <div className="flex gap-2">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};
export default HomePage;
