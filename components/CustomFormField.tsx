'use client';

import { Input } from './ui/input';
import React from 'react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from './ui/form';
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import E164Number from 'react-phone-number-input';
import Image from 'next/image';

interface CustomFormFieldProps {
    control: Control<any>;
    fieldType: FormFieldType;
    name: string;
    description?: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
    field,
    props,
}: {
    field: any;
    props: CustomFormFieldProps;
}) => {
    const { fieldType, iconAlt, iconSrc, placeholder, disabled } = props;
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            width={24}
                            height={24}
                            alt={iconAlt ?? 'icon'}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            {...field}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        {...field}
                        placeholder={placeholder}
                        disabled={disabled}
                        defaultCountry="UA"
                        international
                        withCountryCallingCode
                        className="input-phone"
                        value={field.value as typeof E164Number | undefined}
                        onChange={field.onChange}
                    />
                </FormControl>
            );
        default:
            return null;
    }
};

const CustomFormField = (props: CustomFormFieldProps) => {
    const {
        control,
        fieldType,
        name,
        description,
        label,
        placeholder,
        iconSrc,
    } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-errpr" />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;
