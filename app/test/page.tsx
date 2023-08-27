'use client';

import styles from './page.module.css'

import type { RootState } from '@/globalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from '@/globalRedux/features/counter/counterSlice';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <span>{count}</span>
      <button 
        className={styles.button}
        onClick={() => dispatch(increment())}
      >Increment</button>
      <button 
        className={styles.button}
        onClick={() => dispatch(decrement())}
      >Decrement</button>
      <button 
        className={styles.button}
        onClick={() => dispatch(reset())}
      >Reset</button>
      <button 
        className={styles.button}
        onClick={() => dispatch(incrementByAmount(2))}
      >Increment by 2</button>
    </main>
  )
}