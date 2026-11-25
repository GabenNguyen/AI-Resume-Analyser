const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-display text-lg leading-none">ResumeScope</span>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ResumeScope. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
