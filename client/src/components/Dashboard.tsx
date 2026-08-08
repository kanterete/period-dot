import {
  ChevronDown,
  Droplet,
  Flower,
  Flower2,
  NotebookPen,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const userName = user?.login || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-app-text">Summary</h1>
          <p className="mt-1 text-sm text-app-muted">Your cycle overview</p>
        </div>

        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-app-primary-soft"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-app-primary-soft text-sm font-bold text-app-primary-dark">
            {userInitial}
          </div>

          <span className="hidden text-sm font-semibold text-app-text sm:block">
            {userName}
          </span>

          <ChevronDown className="h-4 w-4 text-app-muted" />
        </button>
      </header>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
        {/* Current cycle */}
        <article className="flex flex-col rounded-3xl border border-app-border bg-app-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-app-text">
            Your actual cycle
          </h2>

          <div className="mt-8 flex flex-1 items-center justify-center">
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-full sm:h-56 sm:w-56"
              style={{
                background:
                  "conic-gradient(#e94f78 0deg 154deg, #ffd9df 154deg 360deg)",
              }}
            >
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-app-card sm:h-44 sm:w-44">
                <span className="text-sm text-app-muted">Day</span>
                <span className="text-5xl font-bold text-app-text">12</span>
                <span className="mt-1 text-sm font-medium text-app-text">
                  from 28
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-app-muted">Phase</p>

            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-app-primary-dark">
              <Flower2 className="h-4 w-4" />
              <span>Ovulation in 2 days</span>
            </div>
          </div>
        </article>

        {/* Right column */}
        <div className="grid gap-6">
          {/* Next period */}
          <article className="rounded-3xl border border-app-border bg-app-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-app-text">Next period</h2>

            <div className="mt-6">
              <p className="text-3xl font-bold text-app-text">15th May</p>
              <p className="mt-1 text-sm text-app-muted">in 18 days</p>
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-2xl border border-app-border bg-white px-5 py-3 text-sm font-semibold text-app-text shadow-sm transition hover:border-app-primary hover:text-app-primary-dark"
            >
              Edit dates
            </button>
          </article>

          {/* Quick add */}
          <article className="rounded-3xl border border-app-border bg-app-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-app-text">Quick add</h2>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              <button
                type="button"
                className="flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:bg-app-primary-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-app-primary-soft text-app-primary-dark">
                  <Droplet className="h-5 w-5" />
                </span>

                <span className="text-center text-xs font-medium text-app-text">
                  Period
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:bg-app-primary-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-app-primary-soft text-app-primary-dark">
                  <Flower className="h-5 w-5" />
                </span>

                <span className="text-center text-xs font-medium text-app-text">
                  Symptoms
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:bg-app-primary-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-app-primary-soft text-app-primary-dark">
                  <NotebookPen className="h-5 w-5" />
                </span>

                <span className="text-center text-xs font-medium text-app-text">
                  Note
                </span>
              </button>
            </div>
          </article>
        </div>
      </div>

      {/* Bottom banner */}
      <article className="relative overflow-hidden rounded-3xl border border-app-border bg-app-accent-light p-6 shadow-sm">
        <div className="relative z-10 max-w-md">
          <p className="text-sm font-medium text-app-text">
            Remember, every body is different.
          </p>

          <p className="mt-2 text-sm text-app-muted">
            Take care of yourself everyday! 💜
          </p>
        </div>

        <div className="absolute -bottom-10 right-8 h-32 w-32 rounded-full bg-app-primary-soft/70" />
        <div className="absolute -bottom-6 right-28 h-20 w-20 rounded-full bg-app-accent/30" />
      </article>
    </section>
  );
};

export default Dashboard;
