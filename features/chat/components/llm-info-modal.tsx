"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LlmInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LlmInfoModal({ isOpen, onClose }: LlmInfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Understanding AI Language Models</DialogTitle>
          <DialogDescription>
            Important information about how LLMs work and their limitations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 text-sm">
          <h3 className="font-medium">Why LLMs Can Be Wrong</h3>
          <p>
            Large Language Models (LLMs) like the one powering this chat can
            sometimes provide incorrect, outdated, or misleading information.
            Here's why:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Training Data Limitations:</span>{" "}
              LLMs learn from data that has a cutoff date and may not include
              recent events or developments.
            </li>
            <li>
              <span className="font-semibold">Hallucinations:</span> LLMs can
              confidently generate plausible-sounding but factually incorrect
              information.
            </li>
            <li>
              <span className="font-semibold">Lack of True Understanding:</span>{" "}
              Despite appearing intelligent, LLMs don't truly understand
              concepts the way humans do - they predict text patterns.
            </li>
            <li>
              <span className="font-semibold">No External Verification:</span>{" "}
              LLMs typically don't fact-check their responses against reliable
              sources unless specifically designed to do so.
            </li>
          </ul>
          <h3 className="font-medium pt-2">Best Practices</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Verify important information with trusted sources</li>
            <li>Ask for clarification if responses seem unclear</li>
            <li>
              Be aware that responses can reflect biases present in training
              data
            </li>
            <li>
              Use AI-generated content as a starting point, not definitive
              answers
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
