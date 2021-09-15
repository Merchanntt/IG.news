import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceID: string;
}

export const SubscribeButton= ({ priceID }: SubscribeButtonProps) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  );
}
