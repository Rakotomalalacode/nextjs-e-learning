"use client"

import { signOut } from "next-auth/react"
import { IoLogOutOutline } from "react-icons/io5"
import {  useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@/interface/DashboarUse";

const Admin = () => {
    const searchParams = useSearchParams();
    const googleId = searchParams.get("U");

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (googleId) {
            fetch(`/api/users?U=${googleId}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const text = await res.text();
                        console.error("Erreur serveur :", text);
                        throw new Error("Échec de récupération des données");
                    }
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => {
                    console.error("Erreur lors de la récupération de l'utilisateur", err);
                    setError("Impossible de charger les données.");
                });
        }
    }, [googleId]);

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            Admin
            <p>{user?.googleId}</p>
            <p>{user?.createdAt}</p>
            <p>{user?.role}</p>
            <img src={user?.image} alt={user?.image} className="w-16 h-1/6" />
            <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className='border rounded p-2 bg-red-600 text-white hover:bg-red-600/80'
            ><IoLogOutOutline size={25} /></button>
        </div>
    )
}

export default Admin