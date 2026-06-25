import styles from "./Button.module.css";

export default function Button({

    children,

    variant = "primary",

    size = "md",

    loading = false,

    disabled = false,

    icon = null,

    type = "button",

    onClick

}) {

    return (

        <button

            type={type}

            disabled={disabled || loading}

            onClick={onClick}

            className={`
                ${styles.button}
                ${styles[variant]}
                ${styles[size]}
            `}

        >

            {loading ? (

                <span className={styles.loader}></span>

            ) : (

                <>

                    {icon &&

                        <span className={styles.icon}>

                            {icon}

                        </span>

                    }

                    {children}

                </>

            )}

        </button>

    );

}