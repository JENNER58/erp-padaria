import styles from "./Select.module.css";

export default function Select({

    label,

    options = [],

    value,

    onChange,

    placeholder = "Selecione uma opção"

}){

    return(

        <div className={styles.container}>

            {label && (

                <label className={styles.label}>

                    {label}

                </label>

            )}

            <select

                className={styles.select}

                value={value}

                onChange={onChange}

            >

                <option value="">

                    {placeholder}

                </option>

                {options.map((item) => (

                    <option

                        key={item}

                        value={item}

                    >

                        {item}

                    </option>

                ))}

            </select>

        </div>

    );

}