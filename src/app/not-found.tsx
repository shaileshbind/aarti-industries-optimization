import Button from "./components/Button";
import { BodyText1, H2 } from "./components/Typography2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 404 Error Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-8xl md:text-[300px] font-bold text-[#FA8129] mb-4">
              404
            </p>
            <H2 className="mb-4">Page not found</H2>
            <BodyText1 className="text-lg mb-8">
              Oops! This page didn&apos;t make the honor roll — let&apos;s get
              you back to class!
            </BodyText1>
            <Button title="Back to Homepage" href="/" useTargetBlank={false} />
          </div>
        </div>
      </main>
    </div>
  );
}
