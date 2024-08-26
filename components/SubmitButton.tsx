import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

interface SubmitButtonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

const SubmitButton = ({
    isLoading,
    className,
    children,
}: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isLoading}
            className={className ?? 'shad-primary-btn w-full'}
        >
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/icons/loader.svg"
                        height={24}
                        width={24}
                        alt="loader"
                        className="animate-spin"
                    />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </Button>
    );
};

export default SubmitButton;
