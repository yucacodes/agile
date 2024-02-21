import { $, component$, useContext } from '@builder.io/qwik'
import style from './points.module.css'
import { StateProvider } from '~/context/ProviderContext'


export const Points = component$(() => {

  const { socket, user, idMeeting, secret, isStartedMeeting, votingId } = useContext(StateProvider)
  
  const points = [
    { value: 0, display: '0 POINTS' },
    { value: 0.5, display: '1/2 POINT' },
    { value: 1, display: '1 POINTS' },
    { value: 2, display: '2 POINTS' },
    { value: 3, display: '3 POINTS' },
    { value: 5, display: '5 POINTS' },
    { value: 8, display: '8 POINTS' },
    { value: 13, display: '13 POINTS' },
    { value: 20, display: '20 POINTS' },
    { value: 100, display: '100 POINTS' },
    { value: null, display: '??' },
  ]

  const handleVote = $((point: number) => {
    socket.value?.emit('UserVoting', {
    meetingId: idMeeting.value!,
    point,
    votingId: votingId.value!,
    }, (payload) => {
      console.log(payload);
      
    })
  })

  return (
    <section class={style.pointsContainer}>
      {points.map((point) => (
        <button 
        disabled={!isStartedMeeting.value}
        onClick$={ () => handleVote(point.value!)}
        class={[!isStartedMeeting.value ? style.disabled : '',style.points, ]}>
          {point.display}
        </button>
      ))}
    </section>
  )
})
