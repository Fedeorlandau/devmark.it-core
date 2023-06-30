import Room from '@/components/Room'

interface EstimatePageProps  {
  params: {
    room: string;
  }
}

function EstimatePage({params: { room }}: EstimatePageProps) {
  return (
      <Room id={room}/>
  )
}

export default EstimatePage