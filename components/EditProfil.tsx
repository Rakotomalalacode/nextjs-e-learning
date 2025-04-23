'use client';

import { useState } from 'react';

type Props = {
    items: EditProfil[];
};

type EditProfil = {
    id: number;
    title: any;
    content: any;
};

export default function EditProfil({ items }: Props) {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-2">
            {items.map(({ id, title, content }) => {
                const isOpen = openItems.includes(id);

                return (
                    <div key={id}>
                        <button
                            onClick={() => toggleItem(id)}
                            className="w-full"
                        >
                            {title}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${isOpen ? 'h-auto' : 'max-h-0'
                                }`}
                        >
                            {content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
