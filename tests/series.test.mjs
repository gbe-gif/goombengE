import assert from 'node:assert/strict';
import { test } from 'node:test';
import { groupStoriesBySeries, normalizeSeriesName, seriesUrl } from '../src/utils/series';
const story = (id, extra = {}) => ({ id, name: id, type: 'work', date: '2026-01-01', isVisible: true, ...extra });
test('series names normalize whitespace and Unicode', () => {
  assert.equal(normalizeSeriesName('  학교   이야기\n '), '학교 이야기');
  assert.equal(normalizeSeriesName('가'), '가');
});
test('only public stories contribute to visitor series groups', () => {
  const groups = groupStoriesBySeries([story('public',{seriesName:'학교'}),story('hidden',{seriesName:'학교',isVisible:false}),story('legacy',{seriesName:'학교',isVisible:undefined}),story('notice',{seriesName:'학교',type:'notice'}),story('ungrouped')]);
  assert.deepEqual(groups.get('학교').map(item => item.id), ['public']);
  assert.equal(groups.size, 1);
});
test('private-only series do not appear to visitors', () => {
  assert.equal(groupStoriesBySeries([story('secret',{seriesName:'숨긴 시리즈',isVisible:false})]).size, 0);
});
test('administrator can organize private series members', () => {
  assert.equal(groupStoriesBySeries([story('secret',{seriesName:'학교',isVisible:false})], true).get('학교').length, 1);
});
test('explicit order comes first, followed by creation date and stable id', () => {
  const groups = groupStoriesBySeries([story('z',{seriesName:'학교',date:'2026-02-01'}),story('two',{seriesName:'학교',seriesOrder:2}),story('b',{seriesName:'학교'}),story('one',{seriesName:' 학교 ',seriesOrder:1}),story('a',{seriesName:'학교'}),story('negative',{seriesName:'학교',seriesOrder:-1,date:'2026-03-01'})]);
  assert.deepEqual(groups.get('학교').map(item => item.id), ['one','two','a','b','z','negative']);
});
test('series links safely encode names and empty input produces no groups', () => {
  const url = seriesUrl('  학교 & 사랑 / 시즌 1 ');
  assert.equal(new URL(url,'https://example.test').searchParams.get('name'), '학교 & 사랑 / 시즌 1');
  assert.equal(groupStoriesBySeries([]).size, 0);
});
