import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getOocCopyText } from '../src/utils/ooc';

const prompt = '<OOC>\n# 제목\n## 규칙\n- RP를 중단\n  - 들여쓰기 유지\n\n## 내용\n- 내용\n</OOC>';
test('only the outer markdown fence is removed, preserving all prompt syntax', () => {
  assert.equal(getOocCopyText('```markdown\n' + prompt + '\n```'), prompt);
});
test('unfenced OOC is copied exactly as written', () => {
  assert.equal(getOocCopyText(prompt), prompt);
});
test('CRLF and whitespace inside the prompt are preserved', () => {
  const inner = '  <OOC>\r\n\r\n# 제목\r\n  - 규칙  \r\n</OOC>';
  assert.equal(getOocCopyText('\r\n```markdown\r\n' + inner + '\r\n```\r\n'), inner);
});
test('inner backticks are retained inside a longer outer fence', () => {
  const inner = '# 규칙\n```text\n내부 예시\n```';
  assert.equal(getOocCopyText('````markdown\n' + inner + '\n````'), inner);
});
test('an unclosed fence does not silently remove prompt content', () => {
  const source = '```markdown\n' + prompt;
  assert.equal(getOocCopyText(source), source);
});
test('whole-body copy retains explanations and multiple separate blocks', () => {
  const source = '```markdown\n첫 블록\n```\n\n설명\n\n```markdown\n둘째 블록\n```';
  assert.equal(getOocCopyText(source), source);
});
test('tilde fences work with the same preservation rules', () => {
  assert.equal(getOocCopyText('~~~markdown\n' + prompt + '\n~~~'), prompt);
});
