"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { eventSchema } from "@/app/lib/schemas/event";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type FormState = {
  event_name: string;
  event_location: string;
  description?: string;
  event_date: string;
  is_paid: boolean;
  category: "tech" | "concert" | "fun" | "workshop" | "meetup";
  ticket_platform_url?: string;
  social_links?: Record<string, string>;
};

export default function EventForm() {
  const [form, setForm] = useState<FormState>({
    event_name: "",
    event_location: "",
    description: "",
    event_date: "",
    is_paid: false,
    category: "tech",
    ticket_platform_url: "",
    social_links: {},
  });

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const uploadPoster = async (file: File) => {
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "posters";
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const path = `${timestamp}_${Math.random().toString(36).slice(2, 9)}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadErr) throw uploadErr;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // client-side validation
      const payloadCandidate = {
        event_name: form.event_name,
        event_location: form.event_location,
        description: form.description,
        event_date: form.event_date,
        is_paid: form.is_paid,
        category: form.category,
        ticket_platform_url: form.ticket_platform_url || null,
        social_links: form.social_links || {},
      };

      // validate zod
      eventSchema.parse(payloadCandidate);

      // upload poster if any
      let posterUrl: string | null = null;
      if (posterFile) {
        posterUrl = await uploadPoster(posterFile);
      }

      // get current session & token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.access_token) {
        throw new Error("Not authenticated. Please sign in.");
      }

      const requestBody = {
        ...payloadCandidate,
        event_poster_url: posterUrl,
      };

      // call server API and pass the user's access token in Authorization header
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(resJson?.error || "Failed to create event");

      setMessage("Event created successfully!");
      // reset form if desired
      setForm({
        event_name: "",
        event_location: "",
        description: "",
        event_date: "",
        is_paid: false,
        category: "tech",
        ticket_platform_url: "",
        social_links: {},
      });
      setPosterFile(null);
    } catch (err: any) {
      setMessage(err.message || "Error creating event.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow space-y-4 text-black"
    >
      <h2 className="text-2xl font-semibold">Create Event</h2>

      <input
        value={form.event_name}
        onChange={(e) => setForm({ ...form, event_name: e.target.value })}
        placeholder="Event name"
        className="w-full px-3 py-2 border rounded"
        required
      />

      <input
        value={form.event_location}
        onChange={(e) => setForm({ ...form, event_location: e.target.value })}
        placeholder="Location"
        className="w-full px-3 py-2 border rounded"
        required
      />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="w-full px-3 py-2 border rounded"
      />

      <input
        type="date"
        value={form.event_date}
        onChange={(e) => setForm({ ...form, event_date: e.target.value })}
        className="px-3 py-2 border rounded"
        required
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value as FormState["category"] })
        }
        className="px-3 py-2 border rounded"
      >
        <option value="tech">Tech</option>
        <option value="concert">Concert</option>
        <option value="fun">Fun</option>
        <option value="workshop">Workshop</option>
        <option value="meetup">Meetup</option>
      </select>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.is_paid}
          onChange={(e) => setForm({ ...form, is_paid: e.target.checked })}
        />
        Paid event?
      </label>

      <input
        value={form.ticket_platform_url || ""}
        onChange={(e) => setForm({ ...form, ticket_platform_url: e.target.value })}
        placeholder="Ticket platform URL (optional)"
        className="w-full px-3 py-2 border rounded"
      />

      <div>
        <label className="block mb-1">Event poster (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setPosterFile(f);
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-lime-500 rounded text-black font-semibold"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
        {message && <p className="text-sm">{message}</p>}
      </div>
    </form>
  );
}
