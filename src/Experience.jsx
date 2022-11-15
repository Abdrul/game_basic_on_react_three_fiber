// import { OrbitControls } from "@react-three/drei";
import Level from "./Level";
import Lights from "./Lights";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player";
import useGames from "./stores/useGames";
import Effects from "./Effects";

export default function Experience() {
  const blocksCount = useGames((state) => state.blocksCount);
  const blocksSeed = useGames((state) => state.blocksSeed);

  return (
    <>
      <color args={["#252731"]} attach="background" />
      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>

      <Effects />
    </>
  );
}
