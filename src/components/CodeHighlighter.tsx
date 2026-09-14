import React from 'react';

interface CodeHighlighterProps {
  code: string;
  className?: string;
  showLineNumbers?: boolean;
}

export const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  className = '',
  showLineNumbers = true
}) => {
  const lines = code.split('\n');

  const renderHighlightedLine = (line: string) => {
    // 1. Full line comments
    if (line.trim().startsWith('//')) {
      return <span className="text-[#6e7681] italic">{line}</span>;
    }

    // Tokenize line recognizing comments, strings, regex, keywords, types, builtins, numbers, and operators
    const tokens = line.split(
      /(\/\/.*$|'[^']*'|"[^"]*"|`[^`]*`|\b(?:import|export|from|default|function|const|let|var|return|async|await|type|interface|as|new|if|else|switch|case|break|try|catch|throw|finally|class|extends|implements|of|in|typeof|instanceof)\b|\b(?:string|number|boolean|void|any|unknown|never|Record|Promise|Array|Map|Set|Date)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|[{}()[\].,;:?!=><+\-*\/%&|^~])/g
    );

    return tokens.map((token, index) => {
      if (!token) return null;

      // Trailing inline comments
      if (token.startsWith('//')) {
        return (
          <span key={index} className="text-[#6e7681] italic">
            {token}
          </span>
        );
      }

      // Keywords -> Vibrant Violet / Magenta (#c084fc or #f472b6)
      if (
        /^(import|export|from|default|function|const|let|var|return|async|await|type|interface|as|new|if|else|switch|case|break|try|catch|throw|finally|class|extends|implements|of|in|typeof|instanceof)$/.test(
          token
        )
      ) {
        return (
          <span key={index} className="text-[#c084fc] font-semibold">
            {token}
          </span>
        );
      }

      // TypeScript Primitive & Utility Types -> Cyan (#38bdf8)
      if (
        /^(string|number|boolean|void|any|unknown|never|Record|Promise|Array|Map|Set|Date)$/.test(
          token
        )
      ) {
        return (
          <span key={index} className="text-[#38bdf8] font-medium">
            {token}
          </span>
        );
      }

      // Literals (true, false, null, undefined) -> Amber (#fbbf24)
      if (/^(true|false|null|undefined)$/.test(token)) {
        return (
          <span key={index} className="text-[#fbbf24] font-medium">
            {token}
          </span>
        );
      }

      // Strings & template literals -> Mint / Green (#4ade80)
      if (/^('[^']*'|"[^"]*"|`[^`]*`)$/.test(token)) {
        return (
          <span key={index} className="text-[#4ade80]">
            {token}
          </span>
        );
      }

      // Numeric literals -> Amber / Orange (#f59e0b)
      if (/^\d+(?:\.\d+)?$/.test(token)) {
        return (
          <span key={index} className="text-[#f59e0b] font-mono">
            {token}
          </span>
        );
      }

      // Punctuation, brackets, delimiters -> Muted Silver (#94a3b8)
      if (/^[{}()[\].,;:?!=><+\-*\/%&|^~]$/.test(token)) {
        return (
          <span key={index} className="text-[#94a3b8]">
            {token}
          </span>
        );
      }

      // Functions or properties followed by call or PascalCase
      if (/^[A-Z][a-zA-Z0-9_]*$/.test(token)) {
        return (
          <span key={index} className="text-[#60a5fa] font-medium">
            {token}
          </span>
        );
      }

      // Standard identifiers and variables -> Crisp Light Gray (#f1f5f9)
      return (
        <span key={index} className="text-[#f1f5f9]">
          {token}
        </span>
      );
    });
  };

  return (
    <div className={`font-mono text-[12px] leading-[1.6] bg-[#0a0a0a] text-[#f1f5f9] overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, idx) => (
            <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
              {showLineNumbers && (
                <td className="pr-4 pl-2 py-0.5 select-none text-right text-[11px] text-[#525252] font-mono w-8 border-r border-[#141414]">
                  {idx + 1}
                </td>
              )}
              <td className="pl-4 pr-2 py-0.5 whitespace-pre font-mono">
                {renderHighlightedLine(line)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
