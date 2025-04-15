'use client'

import Link from "next/link"

export const ButtonModule = ({
    link,
    icon,
    text,
    pathname,
}: {
    link: string,
    icon: React.ReactNode,
    text: string,
    pathname: string
}) => {

    const isButtonActive = pathname.includes(link);

    return (
        <Link
            href={link}
            className={`${isButtonActive && 'bg-custBackground font-semibold'} rounded-md hover:bg-custBackground flex items-center justify-start gap-3 px-3 py-4 transition-all duration-200`}
        >
            {icon}
            <h2 className="text-sm">{text}</h2>
        </Link>
    )
}