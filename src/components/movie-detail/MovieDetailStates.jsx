import HomeLayout from "../../layouts/HomeLayout";

export function MovieDetailLoadingState() {
  return (
    <HomeLayout>
      <section className="flex min-h-screen items-center justify-center bg-white px-5">
        <p className="text-sm font-medium text-neutral-500">
          Loading movie detail...
        </p>
      </section>
    </HomeLayout>
  );
}

export function MovieDetailErrorState({ message }) {
  return (
    <HomeLayout>
      <section className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-5 text-center">
          <h1 className="text-base font-semibold text-red-600">
            Failed to load movie
          </h1>

          <p className="mt-2 text-sm text-red-500">{message}</p>
        </div>
      </section>
    </HomeLayout>
  );
}

export function MovieDetailEmptySchedule({ message }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-8 text-center">
      <p className="text-sm font-semibold text-neutral-700">{message}</p>

      <p className="mt-2 text-xs text-neutral-400">
        Try choosing another location, time, or date.
      </p>
    </div>
  );
}
