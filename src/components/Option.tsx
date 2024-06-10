import { IOption } from "@/interfaces/components/Option";
import { twMerge } from "tailwind-merge";

export function Option({ id, firstValue, value, selectedValue, styles = "" }: IOption) {

    return (
        <option
            id={id}
            value={value}
            selected={selectedValue == value}
            className={twMerge(`
                font-semibold text-[--text-label-login] dark:bg-[--bg-dark-options]
                dark:text-[--text-input-dark]
            `, styles)}
        >
            {firstValue ? firstValue : value}

        </option>
    )
}