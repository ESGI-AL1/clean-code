import re
from playwright.sync_api import Page, expect


def test_has_title(page: Page):
    page.goto("http://localhost:5173/cards")

    expect(page).to_have_title(re.compile("Quizz App"))
    assert page.url == "http://localhost:5173/cards"

    page.get_by_role("link", name="Add Question").click()

    assert page.url == "http://localhost:5173/cards-create"

    page.get_by_role("link", name="Add Question").click()
    page.get_by_placeholder("Question").fill("Question 2*3")
    page.get_by_placeholder("Answer").fill("6")
    page.get_by_placeholder("Tag").fill("math")
    page.get_by_role("button", name="Save").click()
    expect(page.get_by_text("Question 2*3").first).to_be_visible()

    assert page.url == "http://localhost:5173/cards"
