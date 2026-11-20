/// <reference types="cypress" />

describe("AI Playground Decision Tree Induction Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Decision Trees").click({ force: true });
    cy.contains("Decision Tree Induction Lab").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Datasets & Attributes)", () => {
    it("switches dataset presets and verifies attributes and examples table", () => {
      cy.contains("Play Tennis / Weather Dataset").should("be.visible");
      cy.contains("Information Gain Ranking").should("be.visible");
      cy.contains("Training Examples").should("be.visible");

      // Switch to Holiday Destination dataset
      cy.get('select[aria-label="Select Dataset"]').select("likesHoliday");
      cy.contains("Likes Holiday Dataset").should("be.visible");

      // Switch to TV Program Recommendation
      cy.get('select[aria-label="Select Dataset"]').select("likesTV");
      cy.contains("Likes TV Show Dataset").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Information Gain Ranking & Algorithms)", () => {
    it("selects algorithm criteria (ID3, C4.5, CART) and inspects gain ranking", () => {
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "id3");

      cy.get('select[aria-label="Select Algorithm"]').select("c45");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "c45");

      cy.get('select[aria-label="Select Algorithm"]').select("id3");
      cy.contains("Information Gain Ranking").should("be.visible");
    });
  });

  describe("3. Running Solutions (Step ID3, Auto-Build Full Tree, Reset)", () => {
    it("steps ID3 algorithm sequentially, performs manual attribute split, auto-builds tree, and resets", () => {
      // 1. Manual attribute split on Outlook
      cy.get('select[aria-label="Select Attribute to Split"]').should("be.visible");
      cy.get('select[aria-label="Select Attribute to Split"]').select("Outlook");
      cy.contains("button", "Split").click({ force: true });

      // 2. Step ID3
      cy.contains("button", "Step (ID3)").should("be.visible").click({ force: true });

      // 3. Auto-Build Full Tree
      cy.contains("button", "Auto-Build Full Tree").click({ force: true });
      cy.contains("Built complete decision tree using ID3 algorithm").should("be.visible");

      // 4. Reset Tree
      cy.contains("button", "Reset").click({ force: true });
      cy.contains(/Initialized decision tree with \d+ examples/).should("be.visible");
    });

    it("switches to Theory & Guide and Log panes without Coding Area", () => {
      // 1. Coding Area does not exist
      cy.contains("button", "Coding Area").should("not.exist");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Decision Trees").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Information Gain Ranking").should("be.visible");
    });
  });
});
