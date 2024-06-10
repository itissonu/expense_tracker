"use client"
import React, { useMemo } from 'react'
import { SingleValue } from "react-select"
import CreatebleSelect from "react-select/creatable"

type Props = {
    onChange: (value?: string) => void;
    onCreate?: (value: string) => void;
    options?: { label: string; value: string }[];
    value?: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;

}
const Select = ({ value, onChange, disabled, onCreate, options = [], placeholder }: Props) => {

    const onSelect = (
        option: SingleValue<{ label: string, value: string }>
    ) => {
        onChange(option?.value)

    }
    const formatedvalue = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value])

    return (
        <div><CreatebleSelect 
        placeholder={placeholder}
        className='text-sm h-10'
        value={formatedvalue}
        onChange={onSelect}
        options={options}
        onCreateOption={onCreate}
        isDisabled={disabled}

        /></div>
    )
}

export default Select