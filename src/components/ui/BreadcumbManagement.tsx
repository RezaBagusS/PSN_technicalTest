
import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BreadCrumbManagement() {
    const pathname = usePathname();

    const arrPath = pathname.split('/').filter((segment) => segment);

    const formatLabel = (segment: string) => {
        return segment
            .replace(/-/g, ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const items = arrPath.map((segment, index) => {
        const url = '/' + arrPath.slice(0, index + 1).join('/');
        return {
            label: formatLabel(segment),
            template: () => index+1 === arrPath.length ? (
                <p className="text-custDark font-semibold">
                    {formatLabel(segment)}
                </p>
            ) : (
                <Link href={url} className="text-custBlack/70 hover:text-custBlack font-semibold">
                    {formatLabel(segment)}
                </Link>
            )
        };
    });

    const home = {
        icon: 'pi pi-home',
        template: () => (
            <Link href="/">
                <i className="pi pi-home" />
            </Link>
        ),
    };

    return (
        <BreadCrumb
            model={items}
            home={home}
            className="custom-breadcrumb"
        />
    );
}