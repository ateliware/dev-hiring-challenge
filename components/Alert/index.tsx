import React, { PropsWithChildren, useMemo } from "react";
import styles from "./Alert.module.css";
export enum AlertPropsVariants {
  success = "success",
  error = "error",
}
export interface AlertProps {
  variant: AlertPropsVariants;
  actions?: React.ReactNode[];
}
export const Alert: React.FC<PropsWithChildren<AlertProps>> = ({
  children,
  variant,
  actions,
}) => {
  const classNames = useMemo(() => {
    const finalClasses = [styles.main];
    switch (variant) {
      case AlertPropsVariants.error:
        finalClasses.push(styles.error);
        break;
      case AlertPropsVariants.success:
        finalClasses.push(styles.success);
        break;
      default:
        break;
    }
    return finalClasses;
  }, [variant]);
  return (
    <div className={classNames.join(" ")} role="alert">
      <main>{children}</main>
      <footer className={styles.footer}>
        <hr className={styles.hr} />
        {actions && (
          <ul className={styles.actions}>
            {actions.map((action, i) => (
              <li key={`alert-action-${i}`}>{action}</li>
            ))}
          </ul>
        )}
      </footer>
    </div>
  );
};
