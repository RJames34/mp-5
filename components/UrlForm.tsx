"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
export default function UrlForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortened, setShortened] = useState("");

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError("");
        setShortened("");

        const res = await fetch("/api/shortenUrl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, alias }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
            return;
        }

        setShortened(`https://mp-55-git-main-rianna-js-projects.vercel.app/${alias}`);
        setUrl("");
        setAlias("");
    }

    return (
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "24px", padding: "32px" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>URL Shortener</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "450px" }}>
                <input
                    type="text"
                    placeholder="Paste your long URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "12px", width: "100%", fontSize: "1.1rem" }}
                />
                <input
                    type="text"
                    placeholder="Choose an alias (e.g. total drama island)"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                    style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "12px", width: "100%", fontSize: "1.1rem" }}
                />
                <button
                    type="submit"
                    style={{ backgroundColor: "#f97316", color: "white", borderRadius: "4px", padding: "12px", cursor: "pointer", fontSize: "1.1rem" }}
                >
                    Shorten your URL
                </button>
            </form>

            {error && <p style={{ color: "red", fontSize: "1.1rem" }}>{error}</p>}

            {shortened && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <p style={{ fontSize: "1.1rem" }}>Your shortened URL,enjoy :</p>
                    <Link href={shortened} style={{ color: "#f97316", textDecoration: "underline", fontSize: "1.1rem" }}>{shortened}</Link>

                </div>
            )}
        </main>
    );
}
