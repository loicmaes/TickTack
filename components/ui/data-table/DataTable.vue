<script setup lang="ts" generic="TData, TValue">
import type {ColumnDef} from "@tanstack/vue-table";
import {
    FlexRender,
    getCoreRowModel,
    useVueTable
} from "@tanstack/vue-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "#components";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  keyName: string;
}>();
const table = useVueTable({
  get data () { return props.data },
  get columns () { return props.columns },
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div>
    <Table>
      <TableHeader>
        <TableRow class="border-b-stone-200 dark:border-b-stone-800" v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow class="border-b-stone-200 dark:border-b-stone-800" v-for="row in table.getRowModel().rows" :key="row.original[keyName]" :data-state="row.getIsSelected() ? 'selected' : undefined">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center text-stone-300 dark:text-stone-700">
              No data to show...
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped lang="sass">

</style>
