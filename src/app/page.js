"use client";
import { useEffect,useState } from "react";

export default function Home() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [driveDate, setDriveDate] = useState("");
  const [eligibleBranch, setEligibleBranch] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [jobType, setJobType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [drives, setDrives] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  useEffect(()=>{
    async function fetchDrives(){
      setFetchLoading(true)
      setFetchError("")
      try{
        const response = await fetch("/api/drives")
        if(response.ok){
          throw new Error("Unable to Load Placement Drives")
        }
        const data = await response.json()
        setDrives(data)
      }catch{
        setFetchError("Unable to load placement drives. Please try again.")
      }finally{
        setFetchLoading(false) 
      }
  }
  fetchDrives()
},[]);
  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const cgpaValue = minCGPA === "" ? undefined : Number(minCGPA);
      if (
        cgpaValue !== undefined &&
        (!Number.isFinite(cgpaValue) || cgpaValue < 0 || cgpaValue > 10)
      ) {
        setMessage("Invalid CGPA, try again!");
        return;
      }
      const response = await fetch("/api/drives",{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({companyName,role,driveDate,eligibleBranch,minCGPA:cgpaValue,jobType:jobType || undefined})
      })
      if (response.ok){
        setMessage("Submitted Successfully!")
        const newDrive = await response.json();
        setDrives((previousDrives) => [...previousDrives, newDrive].sort((a,b)=>new Date(a.driveDate) - new Date(b.driveDate)));
        setCompanyName("")
        setDriveDate("")
        setEligibleBranch("")
        setRole("")
        setMinCGPA("")
        setJobType("")
      }
      else{
        setMessage("Invalid, Try Again!")
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-xl font-bold text-white">
              P
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Placement<span className="text-blue-700">Hub</span>
              </h1>
              <p className="text-xs text-slate-500">
                GNDEC · Training & Placement
              </p>
            </div>
          </div>
          <span className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 sm:block">
            Placement Drive Manager
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Page intro */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-700">
            Dashboard / Overview
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Placement Dashboard
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Manage campus recruitment drives, track eligibility criteria,
            and keep all placement opportunities in one place.
          </p>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total drives
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-bold">{drives.length}</p>
              <span className="rounded-xl bg-blue-50 p-3 text-xl">▤</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              All recorded opportunities
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Internships
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-bold">
                {drives.filter((drive) => drive.jobType === "Internship").length}
              </p>
              <span className="rounded-xl bg-violet-50 p-3 text-xl">✳</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Internship opportunities
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Full-time roles
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-bold">
                {drives.filter((drive) => drive.jobType === "Full-Time").length}
              </p>
              <span className="rounded-xl bg-emerald-50 p-3 text-xl">↗</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Full-time opportunities
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid items-start gap-8 lg:grid-cols-5">
          {/* Add drive form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
                +
              </div>
              <h3 className="text-xl font-bold">Add a placement drive</h3>
              <p className="mt-1 text-sm text-slate-500">
                Enter the details of the new recruitment opportunity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Job role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer Intern"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Drive date and time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={driveDate}
                  onChange={(event) => setDriveDate(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Eligible branch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. CSE, IT"
                  value={eligibleBranch}
                  onChange={(event) => setEligibleBranch(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Minimum CGPA
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="e.g. 7.5"
                    value={minCGPA}
                    onChange={(event) => setMinCGPA(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Job type
                  </label>
                  <select
                    value={jobType}
                    onChange={(event) => setJobType(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Select type</option>
                    <option value="Internship">Internship</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Fields marked with * are required.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving drive..." : "+ Add placement drive"}
              </button>

              {message && (
                <p
                  role="status"
                  className={`rounded-xl border p-3 text-sm ${message.toLowerCase().includes("success")
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                >
                  {message}
                </p>
              )}
            </form>
          </section>

          {/* Drives list */}
          <section className="min-w-0 lg:col-span-3">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">Placement opportunities</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your saved recruitment drives
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
                {drives.length} {drives.length === 1 ? "drive" : "drives"}
              </span>
            </div>

            {fetchLoading ? (
              <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />
                <p className="font-medium">Loading placement drives</p>
                <p className="mt-1 text-sm text-slate-500">
                  Fetching the latest records...
                </p>
              </div>
            ) : fetchError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="font-semibold text-red-700">
                  Unable to load placement drives
                </p>
                <p className="mt-2 text-sm text-red-600">
                  {fetchError}
                </p>
                <button
                  type="button"
                  onClick={fetchDrives}
                  className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Try again
                </button>
              </div>) : drives.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  ▤
                </div>
                <h4 className="font-semibold">No placement drives yet</h4>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Add your first recruitment opportunity using the form to see
                  it listed here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {drives.map((drive) => (
                  <article
                    key={drive.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700">
                          {drive.companyName?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                        <div className="min-w-0">
                          <h4 className="break-words text-lg font-bold">
                            {drive.companyName}
                          </h4>
                          <p className="mt-1 break-words text-sm text-slate-600">
                            {drive.role}
                          </p>
                        </div>
                      </div>

                      {drive.jobType && (
                        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                          {drive.jobType}
                        </span>
                      )}
                    </div>

                    <div className="my-5 h-px bg-slate-100" />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Drive date
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-700">
                          {new Date(drive.driveDate).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Eligible branch
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-700">
                          {drive.eligibleBranch}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Minimum CGPA
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-700">
                          {drive.minCGPA ?? "Not specified"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Opportunity type
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-700">
                          {drive.jobType || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          PlacementHub · Guru Nanak Dev Engineering College · Placement Drive Manager
        </footer>
      </div>
    </main>
  );

}
