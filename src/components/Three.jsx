import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Clone } from '@react-three/drei'
import { useControls } from 'leva'

const Models = [
  // { title: 'Hammer', url: './models/hammer.glb' },
  // { title: 'Drill', url: './models/drill.glb' },
  // { title: 'Tape Measure', url: './models/tapeMeasure.glb' },
  // { title: 'blender', url: './models/blender.gltf' },
  // { title: 'blender2', url: './models/blender2.glb' },
  { title: 'AMI', url: './ami.glb' },
]

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <Clone object={scene} castShadow receiveShadow position={[0, -.3, 0]} scale={.4} />
}

export default function App() {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title)
    }
  })

  return (
    <>
      <Canvas camera={{ position: [0, .2, -0.3], near: 0.025 }}>
        {/* <Environment files="./img/workshop_1k.hdr" background blur={.5} /> */}
        {/* <pointLight position={[20, 20, 90]} intensity={5000} decay={2} distance={1} /> */}
        <pointLight position={[20, 20, 0]} intensity={1000} decay={2} />
        <pointLight position={[-20, 20, 0]} intensity={1000} decay={2} />
        <ambientLight intensity={2} />
        <Suspense>
          <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
        </Suspense>
        <OrbitControls autoRotate />
        {/* <Stats /> */}
      </Canvas>
      {/* <span id="info">Tienes seleccionada la caja {title} </span> */}
    </>
  )
}

useGLTF.preload(Models.map(({ url }) => url))

