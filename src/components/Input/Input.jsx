import styles from "./Input.module.css";

export default function Input({

    label,

    error,

    icon,

    ...props

}){

    return(

        <div className={styles.container}>

            {label &&

                <label className={styles.label}>

                    {label}

                </label>

            }

            <div className={styles.inputBox}>

                {icon &&

                    <span className={styles.icon}>

                        {icon}

                    </span>

                }

                <input

                    className={styles.input}

                    {...props}

                />

            </div>

            {error &&

                <span className={styles.error}>

                    {error}

                </span>

            }

        </div>

    );

}