<template>
  <div>
    <i-input :placeholder="placeholder"
             v-model="messages.input"
             readonly
             @on-focus="showTree">
      <span slot="append"
            @click="clear"
            v-if="clearable"
            style="margin: -5px -20px; padding: 5px 20px; cursor: pointer;">
        <Icon type="ios-close-empty"></Icon>
      </span>
    </i-input>

    <Modal v-model="tree.show"
           title="选择部门"
           width="500px"
           class="sp"
           keepAlive
           @on-ok="selectTree"
           @on-cancel="cancelTree">
      <vma-lazy :initial="tree.show">
        <department-tree ref="tree"
                         :showCheckbox="showCheckbox"
                         :showFilter="showFilter"
                         class="p20" />
      </vma-lazy>
    </Modal>
  </div>
</template>

<script>
import { DepartmentTree } from '@/components/packages/tree'
import inputMixin from './inputMixin'

export default {
  mixins: [inputMixin],
  components: {
    DepartmentTree
  }
}
</script>
