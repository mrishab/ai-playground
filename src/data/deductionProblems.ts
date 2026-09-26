export interface DeductionKB {
  id: string;
  name: string;
  description: string;
  code: string;
  sampleQueries: string[];
}

export interface DeductionKBMap {
  [kbId: string]: DeductionKB;
}

export const DEDUCTION_KBS: DeductionKBMap = {
  elect: {
    id: "elect",
    name: "Electrical Wiring Environment",
    description:
      "Electrical domain reasoning over switches, lights, wires, and circuit connectivity.",
    code: "% CILog / Definite Clause code for the electrical environment.\n% Rules for whether a light is lit:\nlit(L) <- light(L) & ok(L) & live(L).\n\n% Rules for whether a wire or component is live:\nlive(W) <- connected_to(W, W1) & live(W1).\nlive(outside).\n\n% Circuit connectivity based on switch positions:\nconnected_to(l1, w0).\nconnected_to(w0, w1) <- up(s2).\nconnected_to(w0, w2) <- down(s2).\nconnected_to(w1, w3) <- up(s1).\nconnected_to(w2, w3) <- down(s1).\nconnected_to(w3, outside) <- ok(cb1).\n\n% Base facts of the house:\nlight(l1).\nok(l1).\nok(cb1).\nup(s1).\nup(s2).\n",
    sampleQueries: ["lit(l1)", "live(w0)", "connected_to(w0, W)", "live(W)"],
  },
  family: {
    id: "family",
    name: "Family Relationships & Kinship",
    description:
      "Definite clause deduction over parent, ancestor, grandparent, and sibling relationships with variable unification.",
    code: "% Family Kinship Knowledge Base\nparent(pam, bob).\nparent(tom, bob).\nparent(tom, liz).\nparent(bob, ann).\nparent(bob, pat).\nparent(pat, jim).\n\nfemale(pam).\nfemale(liz).\nfemale(ann).\nfemale(pat).\nmale(tom).\nmale(bob).\nmale(jim).\n\nmother(M, C) <- parent(M, C) & female(M).\nfather(F, C) <- parent(F, C) & male(F).\n\ngrandparent(GP, GC) <- parent(GP, P) & parent(P, GC).\ngrandfather(GF, GC) <- grandparent(GF, GC) & male(GF).\n\nancestor(A, D) <- parent(A, D).\nancestor(A, D) <- parent(A, I) & ancestor(I, D).\n\nsibling(X, Y) <- parent(P, X) & parent(P, Y) & dif(X, Y).\n",
    sampleQueries: [
      "grandparent(tom, ann)",
      "ancestor(tom, jim)",
      "mother(pam, Child)",
      "ancestor(A, bob)",
    ],
  },
  courses: {
    id: "courses",
    name: "University Course Prerequisites",
    description:
      "Recursive prerequisite checking and degree eligibility deduction.",
    code: "% University Course Prerequisite Rules\nprereq(cs101, cs102).\nprereq(cs102, cs201).\nprereq(math101, cs201).\nprereq(cs201, cs301).\nprereq(cs201, cs320).\nprereq(cs301, cs420).\n\nrequires(Pre, Target) <- prereq(Pre, Target).\nrequires(Pre, Target) <- prereq(Pre, Inter) & requires(Inter, Target).\n\neligible(Student, Course) <- passed(Student, Pre) & prereq(Pre, Course).\n\npassed(alice, cs101).\npassed(alice, cs102).\npassed(alice, math101).\n",
    sampleQueries: [
      "requires(cs101, cs420)",
      "eligible(alice, Course)",
      "requires(Pre, cs320)",
    ],
  },
};
