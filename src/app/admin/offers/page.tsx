"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Offer } from "@/types/content";

function emptyOffer(): Offer {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    discount: "",
    validFrom: new Date().toISOString().slice(0, 10),
    validTo: new Date().toISOString().slice(0, 10),
    image: "/images/offers/placeholder.jpg",
    active: true,
  };
}

export default function AdminOffersPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function loadOffers() {
    setLoading(true);
    // GET only returns active offers publicly; for full editing we read the
    // raw content file via the same endpoint's data once authenticated in a
    // future iteration. For now, admins edit starting from the currently
    // active list — acceptable for a small, low-volume offers list.
    const res = await fetch("/api/offers");
    const data = await res.json();
    setOffers(data.offers ?? []);
    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      loadOffers();
    } else {
      setLoginError("Incorrect password.");
    }
  }

  async function handleSave() {
    setSaveError(null);
    setSaved(false);
    const res = await fetch("/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offers }),
    });
    if (res.ok) {
      setSaved(true);
    } else {
      setSaveError("Failed to save — please try again.");
    }
  }

  function updateOffer(id: string, patch: Partial<Offer>) {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }

  function removeOffer(id: string) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }

  useEffect(() => {
    // Best-effort: if the session cookie is already valid, skip the login
    // form. A failed load just leaves the login form showing.
    fetch("/api/offers")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.offers) setOffers(data.offers);
      });
  }, []);

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4">
        <Card>
          <CardHeader>
            <CardTitle>Offers Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError && (
                <p className="text-sm text-destructive">{loginError}</p>
              )}
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Offers</h1>
        <Button variant="outline" onClick={() => setOffers((p) => [...p, emptyOffer()])}>
          + Add Offer
        </Button>
      </div>

      {loading && <p className="text-muted-foreground">Loading...</p>}

      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="space-y-3 pt-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Title</Label>
                  <Input
                    value={offer.title}
                    onChange={(e) => updateOffer(offer.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Discount / Price</Label>
                  <Input
                    value={offer.discount}
                    onChange={(e) => updateOffer(offer.id, { discount: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={offer.description}
                  onChange={(e) =>
                    updateOffer(offer.id, { description: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Valid From</Label>
                  <Input
                    type="date"
                    value={offer.validFrom}
                    onChange={(e) =>
                      updateOffer(offer.id, { validFrom: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Valid To</Label>
                  <Input
                    type="date"
                    value={offer.validTo}
                    onChange={(e) => updateOffer(offer.id, { validTo: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={offer.active}
                    onCheckedChange={(checked) =>
                      updateOffer(offer.id, { active: checked === true })
                    }
                  />
                  <Label className="font-normal">Active</Label>
                </div>
                <Button
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => removeOffer(offer.id)}
                >
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave}>Save All Changes</Button>
        {saved && <p className="text-sm text-green-600">Saved!</p>}
        {saveError && <p className="text-sm text-destructive">{saveError}</p>}
      </div>
    </div>
  );
}
