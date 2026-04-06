"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User as UserIcon, Mail, Calendar, MapPin, XCircle, Settings, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { user, cancelBooking } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <div className="min-h-screen pt-32 px-6"><div className="animate-pulse h-64 max-w-4xl mx-auto rounded-3xl" style={{ background: "var(--bg-subtle)" }}/></div>;

  return (
    <div className="min-h-screen pb-24 pt-32">
      <div className="max-w-6xl mx-auto px-6">
        
        <h1 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "var(--text-base)" }}>
          Your Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Account Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl p-8 shadow-premium" style={{ background: "var(--bg-card)", border: "1px solid var(--border-base)" }}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl shadow-inner">
                    {user.avatar}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "var(--primary)" }}>
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-base)" }}>{user.name}</h2>
                <div className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                
                <div className="w-full flex items-center justify-between py-4" style={{ borderTop: "1px solid var(--border-base)" }}>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Total Bookings</span>
                  <span className="text-xl font-bold text-primary">{user.bookings?.length || 0}</span>
                </div>
                <Button variant="outline" className="w-full mt-2 flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" /> Account Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content / Bookings Array */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl p-6 md:p-8 shadow-premium mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-base)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-base)" }}>Recent Bookings</h2>

              {(!user.bookings || user.bookings.length === 0) ? (
                <div className="text-center py-12 rounded-2xl" style={{ background: "var(--bg-subtle)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-black/5 dark:bg-white/5">
                    <Calendar className="w-8 h-8" style={{ color: "var(--text-muted)" }} />
                  </div>
                  <p className="font-semibold mb-2" style={{ color: "var(--text-base)" }}>No bookings found</p>
                  <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
                    Looks like you haven't made any reservations yet. Start exploring Cameroon today!
                  </p>
                  <Link href="/top-destinations">
                    <Button variant="primary">Explore Destinations</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {(user.bookings || []).map((booking) => {
                    const isCancelled = booking.status === 'cancelled';
                    return (
                      <div key={booking.id} className={`rounded-2xl p-5 border transition-opacity ${isCancelled ? 'opacity-60' : ''}`}
                        style={{ background: "var(--bg-subtle)", borderColor: "var(--border-base)" }}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                isCancelled ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'
                              }`}>
                                {booking.status}
                              </span>
                              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                                ID: {booking.id.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold mb-1 mt-2" style={{ color: "var(--text-base)" }}>
                              <Link href={`/sites/${booking.siteId}`} className="hover:underline">
                                {booking.siteName}
                              </Link>
                            </h3>
                            <div className="flex items-center gap-4 text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(booking.date).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5" />{booking.people} {booking.people === 1 ? 'Guest' : 'Guests'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0">
                            <div className="text-right">
                              <p className="text-xs uppercase font-bold tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Total</p>
                              <p className="text-xl font-extrabold text-primary">${booking.totalPrice}</p>
                            </div>
                            {!isCancelled && (
                              <button 
                                onClick={() => cancelBooking(booking.id)}
                                className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-500/10 px-3 py-1.5 rounded-lg">
                                <XCircle className="w-4 h-4" /> Cancel
                              </button>
                            )}
                          </div>
                          
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
