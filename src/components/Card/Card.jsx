import styles from "./Card.module.css";

export default function Card({

    title,

    subtitle,

    children,

    actions,

    padding = "md"

}){

    return(

        <div className={`${styles.card} ${styles[padding]}`}>

            {(title || subtitle || actions) && (

                <div className={styles.header}>

                    <div>

                        {title &&

                            <h2 className={styles.title}>

                                {title}

                            </h2>

                        }

                        {subtitle &&

                            <p className={styles.subtitle}>

                                {subtitle}

                            </p>

                        }

                    </div>

                    {actions &&

                        <div>

                            {actions}

                        </div>

                    }

                </div>

            )}

            <div className={styles.body}>

                {children}

            </div>

        </div>

    );

}