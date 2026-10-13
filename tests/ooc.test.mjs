import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { create, act } from 'react-test-renderer';
import OocContent from '../src/components/OocContent';
import CopyTextButton from '../src/components/CopyTextButton';
import { groupAdminContent } from '../src/utils/adminContent';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const prompt = '<OOC>\n# 제목\n## 규칙\n- RP를 중단\n  - 들여쓰기 유지\n\n'+String.fromCharCode(96).repeat(3)+'markdown\n# 코드블록 안의 헤더\n'+String.fromCharCode(96).repeat(3)+'\n</OOC>';
test('OOC renders all original tags, headings, indentation and code fences as literal text', async () => {
  let tree;
  await act(async () => { tree = create(React.createElement(OocContent, { text: prompt })); });
  assert.deepEqual(tree.root.findByType('code').children, [prompt]);
  assert.equal(tree.root.findAllByType('h1').length, 0);
  assert.equal(tree.root.findAllByType('h2').length, 0);
  await act(async () => tree.unmount());
});
test('whole-source clipboard copy preserves inner and outer code fences exactly', async () => {
  const text = String.fromCharCode(96).repeat(4)+'markdown\r\n'+prompt+'\r\n'+String.fromCharCode(96).repeat(4);
  const previousNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const previousWindow = globalThis.window;
  let copied, tree;
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: async value => { copied = value; } } } });
  globalThis.window = { setTimeout, clearTimeout };
  try {
    await act(async () => { tree = create(React.createElement(CopyTextButton, { text })); });
    await act(async () => { await tree.root.findByType('button').props.onClick(); });
    assert.equal(copied, text);
  } finally {
    if (tree) await act(async () => tree.unmount());
    if (previousNavigator) Object.defineProperty(globalThis, 'navigator', previousNavigator); else delete globalThis.navigator;
    globalThis.window = previousWindow;
  }
});
const item = (id, type, extra = {}) => ({ id, name: id, type, date: '2026-01-01', ...extra });
test('admin pins remain first and category groups contain each remaining post once', () => {
  const items = [item('image','image'),item('pinned','devnote',{isAdminPinned:true}),item('story','work'),item('home','notice',{isPinned:true}),item('secret','ooc',{isVisible:false})];
  const groups = groupAdminContent(items);
  assert.equal(groups[0].id, 'pinned');
  assert.deepEqual(groups[0].items.map(item => item.id), ['pinned']);
  assert.equal(groups.flatMap(group => group.items).length, items.length);
  assert.equal(new Set(groups.flatMap(group => group.items.map(item => item.id))).size, items.length);
  assert.equal(groups.find(group => group.id === 'notice').items[0].id, 'home');
  assert.equal(groups.find(group => group.id === 'ooc').items[0].id, 'secret');
});
test('category filtering preserves admin pins and does not mutate source order', () => {
  const items = [item('image','image'),item('pinned','devnote',{isAdminPinned:true}),item('story','work')];
  const groups = groupAdminContent(items, 'work');
  assert.deepEqual(groups.map(group => group.id), ['pinned', 'work']);
  assert.deepEqual(items.map(item => item.id), ['image', 'pinned', 'story']);
  assert.deepEqual(groupAdminContent([], 'work'), []);
});
