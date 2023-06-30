import Room from '@/components/Room'

interface PrivateEstimatePageProps  {
  params: {
    room: string;
  }
}

function PrivateEstimatePage({params: { room }}: PrivateEstimatePageProps) {
  return (
      <Room id={room} type="anon"/>
  )
}

export default PrivateEstimatePage